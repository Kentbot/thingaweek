import { createAsyncThunk } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

import { AppDispatch, RootState } from './store'
import { carryoverMonthAction, hydrateStateAction, resetStateAction } from './actions'
import { ISODateString } from './types'
import { carryoverCategories, createCategories } from './slices/category.slice'
import { assignCategoryToGroup, carryoverGroups, createGroups } from './slices/group.slice'
import { createTransactions } from './slices/transaction.slice'
import { changeMonth } from './slices/budgetMonth.slice'
import { createIncomeCategories } from './slices/income.slice'
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
      thunk.dispatch(carryoverCategories({ newMonthISO: newMonth }))
      thunk.dispatch(carryoverGroups({ newMonth: newMonth }))

      const currentState = thunk.getState()
      const newGroups = filterToBudgetMonth(currentState.groups, newMonthDateTime)
      newGroups.forEach(group => {
        const prevGroup = currentState.groups.find(g => g.id === group.linkedGroups.prevId)!
        const prevGroupCats = currentState.categories
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

      thunk.dispatch(createIncomeCategories(hydrationSource.income))
      thunk.dispatch(createCategories(hydrationSource.categories))
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
