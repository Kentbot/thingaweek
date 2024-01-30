import { Transaction } from './transaction.model'

export interface CategoryMonth {
  transactions: Transaction[]
  budgetedAmount: number
  endOfMonthAdjust: number
  endOfMonthBalance: number
  previousMonth: CategoryMonth | null
}