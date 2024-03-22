import { DateTime } from 'luxon'
import currency from 'currency.js'

import { Category, WithBudgetMonth } from '@budget/models/types'
import { ExpenseCategory } from '@budget/models/expenseCategory.model'
import { Transaction } from '@budget/models/transaction.model'

export function filterToBudgetMonth<T extends WithBudgetMonth>(modelWithBudgetMonth: T[], newMonth: DateTime): T[] {
  return modelWithBudgetMonth.filter((m: T) => 
    DateTime.fromISO(m.budgetMonth).month === newMonth.month &&
    DateTime.fromISO(m.budgetMonth).year === newMonth.year)
}

export function calculateBalanceForward(category: ExpenseCategory, allCategories: ExpenseCategory[], allTransactions: Transaction[]): string {
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

  return runningBalance.toString()
}

/** Gets all categories preceding the current category, in temporal order */
function getCategoryChain(category: ExpenseCategory, allCategories: ExpenseCategory[]): ExpenseCategory[] {
  let currentCategory = allCategories.find(cat => cat.id === category.linkedMonths.prevId)

  const categoryChain: ExpenseCategory[] = []
  while (currentCategory) {
    categoryChain.push(currentCategory)
    currentCategory = allCategories.find(cat => cat.id === currentCategory?.linkedMonths.prevId)
  }

  categoryChain.reverse()
  return categoryChain
}

export class Validator {
  static category(category: Category): boolean {
    return category.name.length > 0
  }
}