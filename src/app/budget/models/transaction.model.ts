import { DateTime } from 'luxon'

export interface Transaction {
  id: string
  date: DateTime
  description: string
  amount: number
}