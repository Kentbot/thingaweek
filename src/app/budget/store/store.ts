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

export type AppState = typeof defaultState

const reducer = {
  expenseCategories: expenseCategorySlice,
  incomeCategories: incomeSlice,
  groups: groupSlice,
  transactions: transactionSlice,
  budgetMonth: budgetMonthSlice
}

const store = configureStore({
  reducer,
  preloadedState: defaultState
})

export const customStore = (state: RootState) => {
  return configureStore({
    reducer,
    preloadedState: state
  })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store