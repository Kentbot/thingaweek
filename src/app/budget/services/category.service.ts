import currency from 'currency.js'

import { CategoryMonth } from '@budget/models/categoryMonth.model'

export function calculateEomBalance(category: CategoryMonth) {
  const prevMonthBalance = category.previousMonth?.endOfMonthBalance ?? currency(0)
  const spend = category.transactions.reduce(
    (prev, curr) => curr.amount.add(prev), currency(0)
  )

  return prevMonthBalance
    .add(category.budgetedAmount)
    .add(category.additionalIncome)
    .subtract(spend)
    .add(category.endOfMonthAdjust)
}