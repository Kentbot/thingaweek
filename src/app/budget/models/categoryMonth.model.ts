import { Transaction } from './transaction.model'

export interface CategoryMonth {
  id: string
  groupId: string | null
  name: string
  transactions: Transaction[]
  budgetedAmount: number
  endOfMonthAdjust: number
  endOfMonthBalance: number
  previousMonth: CategoryMonth | null
}