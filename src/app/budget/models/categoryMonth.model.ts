import { Transaction } from './transaction.model'

export interface CategoryMonth {
  id: string
  name: string
  transactions: Transaction[]
  budgetedAmount: number
  endOfMonthAdjust: number
  endOfMonthBalance: number
  previousMonth: CategoryMonth | null
}