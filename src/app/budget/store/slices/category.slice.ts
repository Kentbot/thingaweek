import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { DateTime } from "luxon"
import { nanoid } from "nanoid"
import currency from "currency.js"

import { CategoryMonth } from "@budget/models/categoryMonth.model"
import { calculateEomBalance, createIncomeCategory } from "@budget/services/category.service"
import { Transaction } from "@budget/models/transaction.model"

import { ISODateString } from "../types"
import { resetStateAction } from "../actions"
import { changeMonth } from "./budgetMonth.slice"

type CategoryState = {
  incomeCategories: CategoryMonth[]
  monthCategories: CategoryMonth[]
}

const initialIncomeCategory = createIncomeCategory(DateTime.now())

export const initialState: CategoryState = {
  monthCategories: [],
  incomeCategories: [initialIncomeCategory]
}

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory(state, action: PayloadAction<CategoryMonth>) {
      state.monthCategories.push(action.payload)
    },
    createCategories(state, action: PayloadAction<CategoryMonth[]>) {
      state.monthCategories.push(...action.payload)
    },
    updateCategory(state, action: PayloadAction<{ updatedCategory: CategoryMonth, transactions: Transaction[] }>) {
      recalculateLinkedCategories(state.monthCategories, action.payload.updatedCategory, action.payload.transactions)
    },
    deleteCategory(state, action: PayloadAction<{ id: string }>) {
      state.monthCategories.forEach(cat => {
        if (cat.nextMonthId === action.payload.id) {
          cat.nextMonthId = undefined
        }
      })
      
      const existingCatIndex = state.monthCategories.findIndex(c => c.id === action.payload.id)
      if (existingCatIndex !== -1) {
        state.monthCategories.splice(existingCatIndex, 1)
      }
    },
    assignTransaction(state, action: PayloadAction<{ categoryId: string, transactionId: string, allTransactions: Transaction[] }>) {
      [...state.monthCategories, ...state.incomeCategories].forEach(category => {
        const shouldRemoveTransFromCategory =
          category.transactionIds.includes(action.payload.transactionId) &&
          category.id !== action.payload.categoryId
        const shouldAddTransToCategory = category.id === action.payload.categoryId
        const shouldCalculateLinks = !state.incomeCategories.some(c => c.id === action.payload.categoryId)

        if (shouldRemoveTransFromCategory) {
          category.transactionIds = category.transactionIds.filter(tid => tid !== action.payload.transactionId)
          shouldCalculateLinks && recalculateLinkedCategories(state.monthCategories, category, action.payload.allTransactions)
        } else if (shouldAddTransToCategory) {
          category.transactionIds.push(action.payload.transactionId)
          shouldCalculateLinks && recalculateLinkedCategories(state.monthCategories, category, action.payload.allTransactions)
        }
      })
    },
    deleteTransactionFromCategory(state, action: PayloadAction<{ id: string, allTransactions: Transaction[] }>) {
      state.monthCategories.forEach((category) => {
        const shouldRemoveTransFromCategory = category.transactionIds.includes(action.payload.id)
        if (shouldRemoveTransFromCategory) {
          category.transactionIds = category.transactionIds.filter(tid => tid !== action.payload.id)
          recalculateLinkedCategories(state.monthCategories, category, action.payload.allTransactions)
        }
      })
    },
    carryoverCategories(state, action: PayloadAction<{ newMonthISO: ISODateString }>) {
      const targetMonth = DateTime.fromISO(action.payload.newMonthISO)
      const prevMonth = targetMonth.plus({ months: -1 })
      const prevCategories: CategoryMonth[] = state.monthCategories
        .filter(c =>
          DateTime.fromISO(c.budgetMonth).month === prevMonth.month &&
          DateTime.fromISO(c.budgetMonth).year === prevMonth.year &&
          c.nextMonthId === undefined)
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
      state.monthCategories.push(...newCategories)
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(resetStateAction, () => initialState)
      .addCase(changeMonth, (state, action) => {
        const actionDate = DateTime.fromISO(action.payload)
        const incomeExists = state.incomeCategories.some(ic =>
          DateTime.fromISO(ic.budgetMonth).year === actionDate.year &&
          DateTime.fromISO(ic.budgetMonth).month === actionDate.month)
        if (!incomeExists) {
          state.incomeCategories.push(createIncomeCategory(actionDate))
        }
      })
})

const recalculateLinkedCategories = (state: CategoryMonth[], updatedCategory: CategoryMonth, allTransactions: Transaction[]) => {
  let prevEomBalance = calculateEomBalance(updatedCategory, allTransactions).toString()
  updatedCategory.endOfMonthBalance = prevEomBalance

  const categoryToUpdateIndex = state.findIndex((stateCat) => stateCat.id === updatedCategory.id)
  if (categoryToUpdateIndex !== -1) {
    state.splice(categoryToUpdateIndex, 1, updatedCategory)
  } else {
    console.warn('Could not replace category in state while recalculating linked categories')
  }
  
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
  createCategories,
  updateCategory,
  deleteCategory,
  assignTransaction,
  deleteTransactionFromCategory,
  carryoverCategories,
} = categorySlice.actions
export default categorySlice.reducer