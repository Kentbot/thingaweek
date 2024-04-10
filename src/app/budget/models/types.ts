import { ISODateString } from '@/budget/store/types'

export interface WithBudgetMonth {
  budgetMonth: ISODateString
}

export type MonthLink = { prevId?: string, nextId?: string }

export interface Category extends WithBudgetMonth {
  id: string
  name: string
  transactionIds: string[]
}