import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

import { ISODateString } from '../types'
import { resetStateAction } from '../actions'

type BudgetMonthState = ISODateString

export const initialState: BudgetMonthState = DateTime.now().toISODate()

const budgetMonthSlice = createSlice({
  name: 'budgetMonth',
  initialState,
  reducers: {
    changeMonth(state, action: PayloadAction<ISODateString>) {
      return action.payload
    },
  },
  extraReducers: (builder) =>
    builder.addCase(resetStateAction, () => initialState)
})

export const { changeMonth } = budgetMonthSlice.actions
export default budgetMonthSlice.reducer