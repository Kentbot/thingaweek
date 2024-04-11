import { ISODateString } from '@/budget/store/types'

export interface WithBudgetMonth {
  budgetMonth: ISODateString
}

export type MonthLink = { prevId?: string, nextId?: string }

type WithLinks = {
  linkedMonths: MonthLink
}

export interface Category extends WithBudgetMonth, WithLinks {
  id: string
  name: string
  transactionIds: string[]
}