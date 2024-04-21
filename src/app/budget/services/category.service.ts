import { DateTime } from 'luxon'
import currency from 'currency.js'

import { Category, WithBudgetMonth } from '@/budget/models/types'
import { ExpenseCategory } from '@/budget/models/expenseCategory.model'
import { Transaction } from '@/budget/models/transaction.model'
import { validateCurrency } from './currency.service'

export function filterToBudgetMonth<T extends WithBudgetMonth>(modelWithBudgetMonth: T[], newMonth: DateTime): T[] {
  return modelWithBudgetMonth.filter((m: T) => 
    DateTime.fromISO(m.budgetMonth).month === newMonth.month &&
    DateTime.fromISO(m.budgetMonth).year === newMonth.year)
}

export function calculateBalanceForward(category: ExpenseCategory, allCategories: ExpenseCategory[], allTransactions: Transaction[]): currency {
  const categoryChain = getCategoryChain(category, allCategories)

  let runningBalance = currency(0)

  categoryChain.forEach(cat => {
    const transactions = allTransactions.filter(t => cat.transactionIds.includes(t.id))
    const catSpend = transactions.reduce((prev, curr) => prev.add(curr.amount), currency(0))
    runningBalance = runningBalance
      .add(cat.budgetedAmount)
      .add(cat.additionalIncome)
      .subtract(catSpend)
      .add(cat.endOfMonthAdjust)
  })

  return runningBalance
}

/**
 * Gets all categories preceding the current category, in temporal order from earliest to most recent.
 * The temporal order is not strictly necessary since we are only adding/subtracting all values from
 * all categories, but it could be a useful feature in future, and it gives a nice mental visualization.
 */
function getCategoryChain(category: ExpenseCategory, allCategories: ExpenseCategory[]): ExpenseCategory[] {
  let previousCategory = allCategories.find(cat => cat.id === category.linkedMonths.prevId)

  const categoryChain: ExpenseCategory[] = []
  while (previousCategory) {
    categoryChain.push(previousCategory)
    previousCategory = allCategories.find(cat => cat.id === previousCategory?.linkedMonths.prevId)
  }

  categoryChain.reverse()
  return categoryChain
}

export function calculateAvailableBalance(
  category: ExpenseCategory,
  balanceForward: string | currency,
  spend: string | currency
): currency {
  return currency(validateCurrency(balanceForward))
    .add(validateCurrency(category.budgetedAmount))
    .add(validateCurrency(category.additionalIncome))
    .subtract(validateCurrency(spend))
}

export class Validator {
  /** TODO: Return more than just a simple boolean. Should really return a list of errors */
  static category(category: Category): boolean {
    return category.name.length > 0
  }
}