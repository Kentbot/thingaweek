import { CurrencyString } from '@budget/store/types'
import { MonthLink, WithBudgetMonth } from './types'

export interface CategoryMonth extends WithBudgetMonth {
  id: string
  name: string
  transactionIds: string[]
  budgetedAmount: CurrencyString
  additionalIncome: CurrencyString
  endOfMonthAdjust: CurrencyString
  linkedMonths: MonthLink
}