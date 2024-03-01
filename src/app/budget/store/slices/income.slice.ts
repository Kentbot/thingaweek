import { createSlice } from "@reduxjs/toolkit"

import { IncomeMonth } from "@budget/models/incomeMonth.model"
import { resetStateAction } from "../actions"
import { changeMonth } from "./budgetMonth.slice"

type IncomeState = IncomeMonth[]

export const initialState: IncomeState = []

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
    builder
      .addCase(resetStateAction, () => initialState)
      .addCase(changeMonth, (state, action) => {})
})

export const {
} = incomeSlice.actions
export default incomeSlice.reducer