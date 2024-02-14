import { createAsyncThunk } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

import { filterToBudgetMonth } from '@budget/services/category.service'

import { carryoverMonthAction, deleteTransactionAction } from './actions'
import { AppDispatch, RootState } from './store'
import { carryoverCategories, deleteTransactionFromCategory } from './slices/category.slice'
import { carryoverGroups } from './slices/group.slice'
import { ISODateString } from './types'
import { deleteTransaction } from './slices/transaction.slice'

type ThunkReturn<T> = T
type ThunkArgs<T> = T
type ThunkApi = { state: RootState, dispatch: AppDispatch }

export const carryoverMonthThunk = createAsyncThunk<
  ThunkReturn<void>,
  ThunkArgs<ISODateString>,
  ThunkApi>(
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
  ThunkApi>(
    deleteTransactionAction.type,
    (transactionId, thunk) => {
      thunk.dispatch(deleteTransaction({ id: transactionId }))
      thunk.dispatch(deleteTransactionFromCategory({ id: transactionId, allTransactions: thunk.getState().transactions }))
    }
  )