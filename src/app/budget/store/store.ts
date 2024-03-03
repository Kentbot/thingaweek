import { configureStore } from '@reduxjs/toolkit'

import categorySlice, { initialState as initialCategoryState } from './slices/category.slice'
import groupSlice, { initialState as initialGroupState } from './slices/group.slice'
import transactionSlice, { initialState as initialTransactionState } from './slices/transaction.slice'
import budgetMonthSlice, { initialState as initialBudgetMonthState } from './slices/budgetMonth.slice'
import incomeSlice, { initialState as initialIncomeState } from './slices/income.slice'

export const defaultState = {
  categories: initialCategoryState,
  income: initialIncomeState,
  transactions: initialTransactionState,
  budgetMonth: initialBudgetMonthState,
  groups: initialGroupState
}

const store = configureStore({
  reducer: {
    categories: categorySlice,
    income: incomeSlice,
    groups: groupSlice,
    transactions: transactionSlice,
    budgetMonth: budgetMonthSlice
  },
  preloadedState: defaultState
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store