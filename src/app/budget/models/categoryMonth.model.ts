import { CurrencyString } from '@budget/store/types'
import { WithBudgetMonth } from './types'

export interface CategoryMonth extends WithBudgetMonth {
  id: string
  name: string
  transactionIds: string[]
  budgetedAmount: CurrencyString
  additionalIncome: CurrencyString
  endOfMonthAdjust: CurrencyString
  endOfMonthBalance: CurrencyString
  balanceForward: CurrencyString
}