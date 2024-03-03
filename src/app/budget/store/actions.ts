import { createAction } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

export const carryoverMonthAction = createAction<DateTime>('month-carryover')

export const deleteTransactionAction = createAction<{ id: string }>('delete-transaction')

export const hydrateStateAction = createAction('hydrate-state')

export const persistStateAction = createAction('persist-state')

export const resetStateAction = createAction('reset-state')

export const assignIncomeTransaction = createAction<{ incomeId: string, transactionId: string }>('assign-income-transaction')