import { DateTime } from 'luxon'
import { Transaction } from './transaction.model'
import currency from 'currency.js'

export interface CategoryMonth {
  id: string
  name: string
  transactions: Transaction[]
  budgetedAmount: currency
  additionalIncome: currency
  endOfMonthAdjust: currency
  endOfMonthBalance: currency
  previousMonth: CategoryMonth | null
  budgetMonth: DateTime
}