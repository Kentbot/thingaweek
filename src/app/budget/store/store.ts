import { configureStore } from '@reduxjs/toolkit'

import categorySlice from './category.slice'
import groupSlice from './group.slice'
import transactionSlice from './transaction.slice'
import budgetMonthSlice from './budgetMonth.slice'

const store = configureStore({
  reducer: {
    categories: categorySlice,
    groups: groupSlice,
    transactions: transactionSlice,
    budgetMonth: budgetMonthSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store