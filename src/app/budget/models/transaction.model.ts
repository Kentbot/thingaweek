import { CurrencyString, ISODateString } from '@/budget/store/types'
import { WithBudgetMonth } from './types'

export interface Transaction extends WithBudgetMonth {
  id: string
  date: ISODateString
  description: string
  amount: CurrencyString
}