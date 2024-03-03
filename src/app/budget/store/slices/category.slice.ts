import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'
import currency from 'currency.js'

import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { calculateEomBalance } from '@budget/services/category.service'
import { Transaction } from '@budget/models/transaction.model'

import { ISODateString } from '../types'
import { assignIncomeTransaction, resetStateAction } from '../actions'
import { MonthLink } from '../models/monthLink.model'

type CategoryState = {
  categories: CategoryMonth[]
  links: MonthLink[]
}

export const initialState: CategoryState = {
  categories: [],
  links: []
}

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory(state, action: PayloadAction<CategoryMonth>) {
      state.categories.push(action.payload)
    },
    createCategories(state, action: PayloadAction<CategoryMonth[]>) {
      state.categories.push(...action.payload)
    },
    updateCategory(state, action: PayloadAction<{ updatedCategory: CategoryMonth, transactions: Transaction[] }>) {
      recalculateLinkedCategories(state, action.payload.updatedCategory, action.payload.transactions)
    },
    deleteCategory(state, action: PayloadAction<{ id: string }>) {
      const deleteId = action.payload.id
      const existingCatIndex = state.categories.findIndex(c => c.id === deleteId)
      if (existingCatIndex !== -1) {
        state.categories.splice(existingCatIndex, 1)
      }
      state.links.forEach((link, index) => {
        if (link.prevId === deleteId || link.nextId === deleteId) {
          state.links.splice(index, 1)
        }
      })
    },
    assignCategoryTransaction(state, action: PayloadAction<{ categoryId: string, transactionId: string, allTransactions: Transaction[] }>) {
      state.categories.forEach(category => {
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
      state.categories.forEach((category) => {
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
      const prevCategories: CategoryMonth[] = state.categories
        .filter(c =>
          DateTime.fromISO(c.budgetMonth).month === prevMonth.month &&
          DateTime.fromISO(c.budgetMonth).year === prevMonth.year &&
          !state.links.some(link => link.prevId === c.id))
          
      const newCategories: CategoryMonth[] = []
      prevCategories.forEach(prev => {
          const newCatId = nanoid()
          const newCat: CategoryMonth = {
            ...prev,
            id: newCatId,
            transactionIds: [],
            additionalIncome: currency(0).toString(),
            balanceForward: prev.endOfMonthBalance,
            budgetMonth: targetMonth.toISODate()!,
            endOfMonthAdjust: currency(0).toString(),
            endOfMonthBalance: currency(prev.endOfMonthBalance).add(prev.budgetedAmount).toString(),
          }

          state.links.push({ prevId: prev.id, nextId: newCatId})
          newCategories.push(newCat)
        })

      state.categories.push(...newCategories)
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(resetStateAction, () => initialState)
      .addCase(assignIncomeTransaction, (state, action) => {
        state.categories.forEach(cat => {
          cat.transactionIds = cat.transactionIds.filter(tid => tid !== action.payload.transactionId)
        })
      })
})

const recalculateLinkedCategories = (state: CategoryState, updatingCategory: CategoryMonth, allTransactions: Transaction[], prevCategory?: CategoryMonth) => {
  if (prevCategory) {
    updatingCategory.balanceForward = prevCategory.endOfMonthBalance
  }

  const updatedEomBalance = calculateEomBalance(updatingCategory, allTransactions).toString()
  updatingCategory.endOfMonthBalance = updatedEomBalance

  const nextCatId = state.links.find(link => link.prevId === updatingCategory.id)?.nextId
  const nextCat = state.categories.find(c => c.id === nextCatId)

  if (nextCat) {
    recalculateLinkedCategories(state, nextCat, allTransactions, updatingCategory)
  }
}

export const {
  createCategory,
  createCategories,
  updateCategory,
  deleteCategory,
  assignCategoryTransaction,
  deleteTransactionFromCategory,
  carryoverCategories,
} = categorySlice.actions
export default categorySlice.reducer