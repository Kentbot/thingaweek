import { configureStore } from '@reduxjs/toolkit'

import expenseCategorySlice, { initialState as initialCategoryState } from './slices/expenseCategory.slice'
import groupSlice, { initialState as initialGroupState } from './slices/group.slice'
import transactionSlice, { initialState as initialTransactionState } from './slices/transaction.slice'
import budgetMonthSlice, { initialState as initialBudgetMonthState } from './slices/budgetMonth.slice'
import incomeSlice, { initialState as initialIncomeState } from './slices/incomeCategory.slice'

export const defaultState = {
  expenseCategories: initialCategoryState,
  incomeCategories: initialIncomeState,
  transactions: initialTransactionState,
  budgetMonth: initialBudgetMonthState,
  groups: initialGroupState
}

const store = configureStore({
  reducer: {
    expenseCategories: expenseCategorySlice,
    incomeCategories: incomeSlice,
    groups: groupSlice,
    transactions: transactionSlice,
    budgetMonth: budgetMonthSlice
  },
  preloadedState: defaultState
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store