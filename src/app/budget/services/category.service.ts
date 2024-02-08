import currency from 'currency.js'

import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { Transaction } from '@budget/models/transaction.model'

export function calculateEomBalance(category: CategoryMonth, transactions: Transaction[]) {
  const categoryTransactions = transactions.filter(t => category.transactionIds.includes(t.id))
  const prevMonthBalance = category.balanceForward ?? currency(0)
  const spend = categoryTransactions.reduce(
    (prev, curr) => curr.amount.add(prev), currency(0)
  )

  return prevMonthBalance
    .add(category.budgetedAmount)
    .add(category.additionalIncome)
    .subtract(spend)
    .add(category.endOfMonthAdjust)
}