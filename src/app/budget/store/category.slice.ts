import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DateTime } from "luxon"

import { CategoryMonth } from "@budget/models/categoryMonth.model"
import { nanoid } from "nanoid"
import currency from "currency.js"
import { ISODateString } from "./types"

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
    carryoverCategories(state, action: PayloadAction<{ newMonthISO: ISODateString }>) {
      const targetMonth = DateTime.fromISO(action.payload.newMonthISO)
      const prevMonth = targetMonth.plus({ months: -1 })
      const prevCategories: CategoryMonth[] = state
        .filter(c =>
          DateTime.fromISO(c.budgetMonth).month === prevMonth.month &&
          DateTime.fromISO(c.budgetMonth).year === prevMonth.year)
      const newCategories: CategoryMonth[] = prevCategories
        .map(c => ({
          ...c,
          id: nanoid(),
          prevMonthId: c.id,
          transactionIds: [],
          additionalIncome: '0',
          balanceForward: c.endOfMonthBalance,
          budgetMonth: targetMonth.toISODate()!,
          endOfMonthAdjust: '0',
          endOfMonthBalance: currency(c.endOfMonthBalance).add(c.budgetedAmount).toString(),
        }))
      prevCategories.forEach(c => {
        const nextCat = newCategories.find(nc => nc.prevMonthId === c.id)
        c.nextMonthId = nextCat?.id
      })
      state.push(...newCategories)
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