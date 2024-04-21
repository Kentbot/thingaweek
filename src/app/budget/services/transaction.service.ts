import { DateTime } from 'luxon'

import { Transaction } from '@/budget/models/transaction.model'

export function sortTransactionsByDate(transactions: Transaction[]): Transaction[] {
  // This should ideally be toSorted in order to prevent side-effects, but NextJs
  // doesn't support this yet
  return transactions.sort((a, b) => {
    // Is negative if a is earlier than b
    const dateDiff = DateTime.fromISO(a.date).diff(DateTime.fromISO(b.date)).milliseconds

    return dateDiff > 0 ? 1 :
      dateDiff < 0 ? -1 :
      0
  })
}