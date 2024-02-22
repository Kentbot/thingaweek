import { configureStore } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

import categorySlice from './slices/category.slice'
import groupSlice from './slices/group.slice'
import transactionSlice from './slices/transaction.slice'
import budgetMonthSlice from './slices/budgetMonth.slice'

export const defaultState = {
  categories: { incomeCategories: [], monthCategories: [] },
  transactions: [],
  budgetMonth: DateTime.now().toISODate(),
  groups: []
}

const store = configureStore({
  reducer: {
    categories: categorySlice,
    groups: groupSlice,
    transactions: transactionSlice,
    budgetMonth: budgetMonthSlice
  },
  preloadedState: defaultState
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store