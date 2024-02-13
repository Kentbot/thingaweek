import { createAsyncThunk } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

import { filterToBudgetMonth } from '@budget/services/category.service'

import { carryoverMonthAction } from './actions'
import { AppDispatch, RootState } from './store'
import { carryoverCategories } from './category.slice'
import { carryoverGroups } from './group.slice'
import { ISODateString } from './types'

type ThunkReturn = void
type ThunkArgs = ISODateString
type ThunkApi = { state: RootState, dispatch: AppDispatch }
export const carryoverMonth = createAsyncThunk<
  ThunkReturn,
  ThunkArgs,
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
    console.log('new state, does it work?', currentState)
    const newCategories = filterToBudgetMonth(currentState.categories, newMonthDateTime)
    thunk.dispatch(carryoverGroups({ newMonth: newMonth, newCategories }))
  }
)