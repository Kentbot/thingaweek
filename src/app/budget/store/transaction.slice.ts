import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Transaction } from '@budget/models/transaction.model'

const initialState: Transaction[] = []

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    createTransaction(state, action: PayloadAction<Transaction>) {
      state.push(action.payload)
    },
    createTransactions(state, action: PayloadAction<Transaction[]>) {
      return [...state, ...action.payload]
    },
    deleteTransaction(state, action: PayloadAction<{ id: string }>) {
      return state.filter(trans => trans.id !== action.payload.id)
    },
  },
})

export const { createTransaction, createTransactions, deleteTransaction } = transactionSlice.actions
export default transactionSlice.reducer