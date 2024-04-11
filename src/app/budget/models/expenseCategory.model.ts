import { CurrencyString } from '@/budget/store/types'
import { Category } from './types'

export interface ExpenseCategory extends Category {
  budgetedAmount: CurrencyString
  additionalIncome: CurrencyString
  endOfMonthAdjust: CurrencyString
}