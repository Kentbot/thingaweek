import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DateTime } from "luxon"
import { nanoid } from "nanoid"
import currency from "currency.js"

import { CategoryMonth } from "@budget/models/categoryMonth.model"
import { calculateEomBalance } from "@budget/services/category.service"
import { Transaction } from "@budget/models/transaction.model"
import { ISODateString } from "../types"
import { deleteTransactionAction } from "../actions"

const initialState: CategoryMonth[] = []

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory(state, action: PayloadAction<CategoryMonth>) {
      state.push(action.payload)
    },
    updateCategory(state, action: PayloadAction<{ updatedCategory: CategoryMonth, transactions: Transaction[] }>) {
      recalculateLinkedCategories(state, action.payload.updatedCategory, action.payload.transactions)
    },
    deleteCategory(state, action: PayloadAction<{ id: string }>) {
      return state.filter(cat => cat.id !== action.payload.id)
    },
    assignTransaction(state, action: PayloadAction<{ categoryId: string, transactionId: string, allTransactions: Transaction[] }>) {
      state.forEach(category => {
        const shouldRemoveTransFromCategory =
          category.transactionIds.includes(action.payload.transactionId) &&
          category.id !== action.payload.categoryId
        const shouldAddTransToCategory = category.id === action.payload.categoryId

        if (shouldRemoveTransFromCategory) {
          category.transactionIds = category.transactionIds.filter(tid => tid !== action.payload.transactionId)
          recalculateLinkedCategories(state, category, action.payload.allTransactions)
        } else if (shouldAddTransToCategory) {
          category.transactionIds.push(action.payload.transactionId)
          recalculateLinkedCategories(state, category, action.payload.allTransactions)
        }
      })
    },
    deleteTransactionFromCategory(state, action: PayloadAction<{ id: string, allTransactions: Transaction[] }>) {
      state.forEach((category) => {
        const shouldRemoveTransFromCategory = category.transactionIds.includes(action.payload.id)
        if (shouldRemoveTransFromCategory) {
          category.transactionIds = category.transactionIds.filter(tid => tid !== action.payload.id)
          recalculateLinkedCategories(state, category, action.payload.allTransactions)
        }
      })
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

const recalculateLinkedCategories = (state: CategoryMonth[], updatedCategory: CategoryMonth, allTransactions: Transaction[]) => {
  let prevEomBalance = calculateEomBalance(updatedCategory, allTransactions).toString()
  updatedCategory.endOfMonthBalance = prevEomBalance

  state.splice(state.findIndex((stateCat) => stateCat.id === updatedCategory.id), 1, updatedCategory)
  
  let nextCategory = state.find(stateCategory => stateCategory.id === updatedCategory.nextMonthId)
  while (nextCategory !== undefined) {
    nextCategory.balanceForward = prevEomBalance

    prevEomBalance = calculateEomBalance(nextCategory, allTransactions).toString()
    nextCategory.endOfMonthBalance = prevEomBalance
    
    nextCategory = state.find(c => c.id === nextCategory?.nextMonthId)
  }
}

export const {
  createCategory,
  updateCategory,
  deleteCategory,
  assignTransaction,
  deleteTransactionFromCategory,
  carryoverCategories,
} = categorySlice.actions
export default categorySlice.reducer