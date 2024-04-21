// Temporary fix until toSorted is natively supported by nextjs
// See https://github.com/vercel/next.js/issues/58242
import 'core-js/features/array/to-sorted'

import { DateTime } from 'luxon'

import { Transaction } from '@/budget/models/transaction.model'

export function sortTransactionsByDate(transaction: Transaction[]): Transaction[] {
  return transaction.toSorted((a, b) => {
    // Is negative if a is earlier than b
    const dateDiff = DateTime.fromISO(a.date).diff(DateTime.fromISO(b.date)).milliseconds

    return dateDiff > 0 ? 1 :
      dateDiff < 0 ? -1 :
      0
  })
}