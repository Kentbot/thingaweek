import { CurrencyString } from '@budget/store/types'
import { Category, MonthLink } from './types'

export interface CategoryMonth extends Category {
  budgetedAmount: CurrencyString
  additionalIncome: CurrencyString
  endOfMonthAdjust: CurrencyString
  linkedMonths: MonthLink
}