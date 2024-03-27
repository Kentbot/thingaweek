import { createAsyncThunk } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

import { AppDispatch, RootState } from './store'
import { carryoverMonthAction, hydrateStateAction, resetStateAction } from './actions'
import { ISODateString } from './types'
import { carryoverExpenses, createExpenseCategories } from './slices/expenseCategory.slice'
import { assignCategoryToGroup, carryoverGroups, createGroups } from './slices/group.slice'
import { createTransactions } from './slices/transaction.slice'
import { changeMonth } from './slices/budgetMonth.slice'
import { createIncomeCategories } from './slices/incomeCategory.slice'
import { filterToBudgetMonth } from '@budget/services/category.service'

type ThunkReturn<T> = T
type ThunkArgs<T> = T
type ThunkApi = { state: RootState, dispatch: AppDispatch }

export const carryoverMonthThunk = createAsyncThunk<
  ThunkReturn<void>,
  ThunkArgs<ISODateString>,
  ThunkApi> (
    carryoverMonthAction.type,
    (newMonth, thunk) => {
      const newMonthDateTime = DateTime.fromISO(newMonth)
      if (!newMonthDateTime) {
        console.error(`Failed to carry over month, malformed month: ${newMonth}`)
        return
      }
      thunk.dispatch(carryoverExpenses({ newMonthISO: newMonth }))
      thunk.dispatch(carryoverGroups({ newMonth: newMonth }))

      const currentState = thunk.getState()
      const newGroups = filterToBudgetMonth(currentState.groups, newMonthDateTime)
      newGroups.forEach(group => {
        const prevGroup = currentState.groups.find(g => g.id === group.linkedGroups.prevId)!
        const prevGroupCats = currentState.expenseCategories
          .filter(cat => prevGroup.categoryIds.includes(cat.id))

        prevGroupCats.forEach(prevCat => {
          if (!prevCat.linkedMonths.nextId) {
            console.warn('Carryover Month Thunk: Could not find linked category for group: ', group.name)
            return
          }
          thunk.dispatch(assignCategoryToGroup({ groupId: group.id, categoryId: prevCat.linkedMonths.nextId }))
        })
      })
    }
  )

export const hydrateState = createAsyncThunk<
  ThunkReturn<void>,
  ThunkArgs<RootState>,
  ThunkApi> (
    hydrateStateAction.type,
    (hydrationSource, thunk) => {

      // Wipe state clean first, then hydrate
      thunk.dispatch(resetStateAction())

      thunk.dispatch(createIncomeCategories(hydrationSource.incomeCategories))
      thunk.dispatch(createExpenseCategories(hydrationSource.expenseCategories))
      thunk.dispatch(createTransactions(hydrationSource.transactions))
      thunk.dispatch(createGroups(hydrationSource.groups))
      thunk.dispatch(changeMonth(hydrationSource.budgetMonth))
    }
  )

export const persistState = createAsyncThunk<
  ThunkReturn<void>,
  ThunkArgs<void>,
  ThunkApi> (
    hydrateStateAction.type,
    (_, thunk) => {
      const state = thunk.getState()
      localStorage.setItem('state', JSON.stringify(state))
    }
  )
