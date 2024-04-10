import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'
import currency from 'currency.js'

import { ExpenseCategory } from '@/budget/models/expenseCategory.model'
import { filterToBudgetMonth } from '@/budget/services/category.service'

import { ISODateString } from '../types'
import { assignIncomeTransaction, resetStateAction, unassignTransaction } from '../actions'
import { deleteTransaction } from './transaction.slice'

type CategoryState = ExpenseCategory[]

export const initialState: CategoryState = []

const expenseCategorySlice = createSlice({
  name: 'expenseCategories',
  initialState,
  reducers: {
    createExpenseCategory(state, action: PayloadAction<ExpenseCategory>) {
      state.push(action.payload)
    },
    createExpenseCategories(state, action: PayloadAction<ExpenseCategory[]>) {
      state.push(...action.payload)
    },
    updateExpenseCategory(state, action: PayloadAction<ExpenseCategory>) {
      const catIndex = state.findIndex(cat => cat.id === action.payload.id)

      if (catIndex !== -1) {
        const updateCategory = state[catIndex]
        state.splice(catIndex, 1, { ...updateCategory, ...action.payload })
      }
    },
    deleteExpenseCategory(state, action: PayloadAction<{ id: string }>) {
      const deleteId = action.payload.id
      const existingCatIndex = state.findIndex(c => c.id === deleteId)
      if (existingCatIndex !== -1) {
        const existingCat = state[existingCatIndex]

        state.forEach(category => {
          if (category.linkedMonths.nextId === existingCat.id) {
            category.linkedMonths.nextId = undefined
          }
          if (category.linkedMonths.prevId === existingCat.id) {
            category.linkedMonths.prevId = undefined
          }
        })

        state.splice(existingCatIndex, 1)
      }
    },
    assignTransactionToExpense(state, action: PayloadAction<{ categoryId: string, transactionId: string }>) {
      state.forEach(category => {
        category.transactionIds = category.transactionIds.filter(tid => tid !== action.payload.transactionId)
        
        const shouldAddTransToCategory = category.id === action.payload.categoryId
        if (shouldAddTransToCategory) {
          category.transactionIds.push(action.payload.transactionId)
        }
      })
    },
    carryoverExpenses(state, action: PayloadAction<{ newMonthISO: ISODateString }>) {
      const targetMonth = DateTime.fromISO(action.payload.newMonthISO)
      const prevMonth = targetMonth.plus({ months: -1 })
      const prevCategories: ExpenseCategory[] = filterToBudgetMonth(state, prevMonth)
        .filter(prevMonthCat => prevMonthCat.linkedMonths.nextId === undefined)
          
      const newCategories: ExpenseCategory[] = []
      prevCategories.forEach(prev => {
          const newCatId = nanoid()
          const newCat: ExpenseCategory = {
            ...prev,
            id: newCatId,
            transactionIds: [],
            additionalIncome: currency(0).toString(),
            budgetMonth: targetMonth.toISODate()!,
            endOfMonthAdjust: currency(0).toString(),
            linkedMonths: { prevId: prev.id }
          }
          
          prev.linkedMonths.nextId = newCatId
          newCategories.push(newCat)
        })

      state.push(...newCategories)
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(resetStateAction, () => initialState)
      .addCase(assignIncomeTransaction, (state, action) => {
        state.forEach(category => {
          // Remove the transaction from any category that has it assigned, because
          // now that transaction is assigned to an Income Category
          category.transactionIds = category.transactionIds.filter(tid => tid !== action.payload.transactionId)
        })
      })
      .addCase(deleteTransaction, (state, action) => {
        state.forEach(category => {
          category.transactionIds = category.transactionIds.filter(tid => tid !== action.payload.transactionId)
        })
      })
      .addCase(unassignTransaction, (state, action) => {
        state.forEach(category => {
          category.transactionIds = category.transactionIds.filter(tid => tid !== action.payload.transactionId)
        })
      })
})

export const {
  createExpenseCategory,
  createExpenseCategories,
  updateExpenseCategory,
  deleteExpenseCategory,
  assignTransactionToExpense,
  carryoverExpenses,
} = expenseCategorySlice.actions
export default expenseCategorySlice.reducer