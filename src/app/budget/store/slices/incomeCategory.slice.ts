import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { assignIncomeTransaction, resetStateAction, unassignTransaction } from '../actions'

import { IncomeCategory } from '@/budget/models/incomeCategory.model'
import { assignTransactionToExpense } from './expenseCategory.slice'
import { deleteTransaction } from './transaction.slice'
import { ISODateString } from '../types'
import { DateTime } from 'luxon'
import { filterToBudgetMonth } from '@/budget/services/category.service'
import { nanoid } from 'nanoid'

type IncomeState = IncomeCategory[]

export const initialState: IncomeState = []

const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    createIncomeCategory: (state, action: PayloadAction<IncomeCategory>) => {
      state.push(action.payload)
    },
    createIncomeCategories: (state, action: PayloadAction<IncomeCategory[]>) => {
      state.push(...action.payload)
    },
    updateIncomeCategory: (state, action: PayloadAction<IncomeCategory>) => {
      const incomeMonthIndex = state.findIndex((incomeMonth) => incomeMonth.id === action.payload.id)

      if (incomeMonthIndex !== -1) {
        state.splice(incomeMonthIndex, 1, action.payload)
      }
    },
    carryoverIncome: (state, action: PayloadAction<{ newMonth: ISODateString }>) => {
      const targetMonth = DateTime.fromISO(action.payload.newMonth)
      const prevMonth = targetMonth.plus({ months: -1 })
      const prevCategories: IncomeCategory[] = filterToBudgetMonth(state, prevMonth)
        .filter(prevMonthCat => prevMonthCat.linkedMonths?.nextId === undefined)

      const newCategories: IncomeCategory[] = []
      prevCategories.forEach(prev => {
        const newCatId = nanoid()
        const newCat: IncomeCategory = {
          ...prev,
          id: newCatId,
          transactionIds: [],
          budgetMonth: targetMonth.toISODate()!,
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
      .addCase(assignTransactionToExpense, (state, action) => {
        filterTransactionFromIncomeCategories(state, action.payload.transactionId)
      })
      .addCase(deleteTransaction, (state, action) => {
        filterTransactionFromIncomeCategories(state, action.payload.transactionId)
      })
      .addCase(unassignTransaction, (state, action) => {
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
  createIncomeCategories,
  updateIncomeCategory,
  carryoverIncome
} = incomeSlice.actions
export default incomeSlice.reducer