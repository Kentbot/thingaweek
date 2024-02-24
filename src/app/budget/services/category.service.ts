import currency from 'currency.js'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'

import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { Transaction } from '@budget/models/transaction.model'
import { WithBudgetMonth } from '@budget/models/types'

export function calculateEomBalance(category: CategoryMonth, transactions: Transaction[]): currency {
  const categoryTransactions = transactions.filter(t => category.transactionIds.includes(t.id))
  const prevMonthBalance = currency(category.balanceForward) ?? currency(0)
  const spend = categoryTransactions.reduce(
    (prev, curr) => currency(curr.amount).add(prev), currency(0)
  )

  return prevMonthBalance
    .add(category.budgetedAmount)
    .add(category.additionalIncome)
    .subtract(spend)
    .add(category.endOfMonthAdjust)
}

export function filterToBudgetMonth<T extends WithBudgetMonth>(modelWithBudgetMonth: T[], newMonth: DateTime): T[] {
  return modelWithBudgetMonth.filter((m: T) => 
    DateTime.fromISO(m.budgetMonth).month === newMonth.month &&
    DateTime.fromISO(m.budgetMonth).year === newMonth.year)
}

export const createIncomeCategory = (budgetMonth: DateTime): CategoryMonth => ({
  id: nanoid(),
  additionalIncome: '0.00',
  balanceForward: '0.00',
  budgetedAmount: '0.00',
  budgetMonth: budgetMonth.toISODate()!,
  endOfMonthAdjust: '0.00',
  endOfMonthBalance: '0.00',
  name: `${budgetMonth.monthShort} Income`,
  transactionIds: [],
})