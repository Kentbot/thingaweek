import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { assignIncomeTransaction, resetStateAction } from "../actions"

import { IncomeMonth } from "@budget/models/incomeMonth.model"
import { assignCategoryTransaction } from "./category.slice"

type IncomeState = IncomeMonth[]

export const initialState: IncomeState = []

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    createIncomeCategory: (state, action: PayloadAction<IncomeMonth>) => {
      state.push(action.payload)
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(resetStateAction, () => initialState)
      // assignIncomeTransaction needs to be externally defined because the category slice needs
      // to respond to it, and the income slice needs to respond to the assign category transaction
      // action. If this action were defined here in the normal way there would be a circular reference
      // between the two slices, each depending on the other's internally-defined actions. This
      // breaks the circular reference at the cost of looking a little silly.
      .addCase(assignIncomeTransaction, (state, action) => {
        const transactionId = action.payload.transactionId
        filterTransactionFromIncomeCategories(state, transactionId)
        state.find(inc => inc.id === action.payload.incomeId)?.transactionIds.push(transactionId)
      })
      .addCase(assignCategoryTransaction, (state, action) => {
        filterTransactionFromIncomeCategories(state, action.payload.transactionId)
      })
})

const filterTransactionFromIncomeCategories = (state: IncomeState, transactionId: string) => {
  state.forEach(inc => {
    inc.transactionIds = inc.transactionIds.filter(tid => tid !== transactionId)
  })
}

export const {
  createIncomeCategory,
} = incomeSlice.actions
export default incomeSlice.reducer