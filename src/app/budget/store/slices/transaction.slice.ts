import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Transaction } from '@/budget/models/transaction.model'

import { resetStateAction } from '../actions'

type TransactionState = Transaction[]

export const initialState: TransactionState = []

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    createTransaction(state, action: PayloadAction<Transaction>) {
      state.push(action.payload)
    },
    createTransactions(state, action: PayloadAction<Transaction[]>) {
      state.push(...action.payload)
    },
    deleteTransaction(state, action: PayloadAction<{ transactionId: string }>) {
      return state.filter(trans => trans.id !== action.payload.transactionId)
    },
  },
  extraReducers: (builder) =>
    builder.addCase(resetStateAction, () => initialState)
})

export const { createTransaction, createTransactions, deleteTransaction } = transactionSlice.actions
export default transactionSlice.reducer