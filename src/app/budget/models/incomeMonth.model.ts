import { WithBudgetMonth } from './types'

export interface IncomeMonth extends WithBudgetMonth {
  id: string
  name: string
  transactionIds: string[]
}