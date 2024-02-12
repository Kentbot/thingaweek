import currency from 'currency.js'
import { DateTime } from 'luxon'

export interface CategoryMonth {
  id: string
  name: string
  nextMonthId?: string
  prevMonthId?: string
  transactionIds: string[]
  budgetedAmount: currency
  additionalIncome: currency
  endOfMonthAdjust: currency
  endOfMonthBalance: currency
  balanceForward: currency
  budgetMonth: DateTime
}