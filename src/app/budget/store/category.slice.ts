import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DateTime } from "luxon"

import { CategoryMonth } from "@budget/models/categoryMonth.model"
import { carryoverMonthAction } from "./actions"

const initialState: CategoryMonth[] = []

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory(state, action: PayloadAction<CategoryMonth>) {
      state.push(action.payload)
    },
    updateCategory(state, action: PayloadAction<CategoryMonth>) {
      const updateCategory = action.payload
      return state.map(cat => {
        if (cat.id === updateCategory.id) return updateCategory
        return cat
      })
    },
    deleteCategory(state, action: PayloadAction<{ id: string }>) {
      return state.filter(cat => cat.id !== action.payload.id)
    },
    assignTransaction(state, action: PayloadAction<{ categoryId: string, transactionId: string }>) {

    },
    carryoverCategories(state, action: PayloadAction<DateTime>) {
      const prevMonth = action.payload.plus({ months: -1 })
      const prevMonthCategories = state.filter(c =>
        c.budgetMonth.month === prevMonth.month &&
        c.budgetMonth.year === prevMonth.year)
    }
  },
})

export const {
  createCategory,
  updateCategory,
  deleteCategory,
  assignTransaction,
  carryoverCategories
} = categorySlice.actions
export default categorySlice.reducer