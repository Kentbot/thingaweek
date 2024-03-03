import { createAction } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

import { Transaction } from '@budget/models/transaction.model'

export const carryoverMonthAction = createAction<DateTime>('month-carryover')

export const deleteTransactionAction = createAction<{ id: string }>('delete-transaction')

export const hydrateStateAction = createAction('hydrate-state')

export const persistStateAction = createAction('persist-state')

export const resetStateAction = createAction('reset-state')

export const assignIncomeTransaction = createAction<{ incomeId: string, transactionId: string, allTransatcions: Transaction[] }>('assign-income-transaction')