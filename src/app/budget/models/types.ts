import { ISODateString } from '@budget/store/types'

export interface WithBudgetMonth {
  budgetMonth: ISODateString
}

export type MonthLink = { prevId?: string, nextId?: string }