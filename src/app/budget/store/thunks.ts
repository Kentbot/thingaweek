import { createAsyncThunk } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

import { filterToBudgetMonth } from '@budget/services/category.service'

import { AppDispatch, RootState } from './store'
import { carryoverMonthAction, deleteTransactionAction, hydrateStateAction, resetStateAction } from './actions'
import { ISODateString } from './types'
import { carryoverCategories, createCategories, deleteTransactionFromCategory } from './slices/category.slice'
import { carryoverGroups, createGroups } from './slices/group.slice'
import { createTransactions, deleteTransaction } from './slices/transaction.slice'
import { changeMonth } from './slices/budgetMonth.slice'

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

      const currentState = thunk.getState()
      const newCategories = filterToBudgetMonth(currentState.categories, newMonthDateTime)
      thunk.dispatch(carryoverGroups({ newMonth: newMonth, newCategories }))
    }
  )

export const deleteTransactionThunk = createAsyncThunk<
  ThunkReturn<void>,
  ThunkArgs<string>,
  ThunkApi> (
    deleteTransactionAction.type,
    (transactionId, thunk) => {
      thunk.dispatch(deleteTransaction({ id: transactionId }))
      thunk.dispatch(deleteTransactionFromCategory({ id: transactionId, allTransactions: thunk.getState().transactions }))
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
