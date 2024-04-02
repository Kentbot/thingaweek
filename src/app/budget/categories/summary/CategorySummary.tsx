import React from 'react'

import currency from 'currency.js'

import { useBudgetMonthCategories, useBudgetMonthIncome, useCategoryTransactions } from '@budget/store/selectors'
import { formatCurrency } from '@budget/services/currency.service'

import './styles.scss'

export function CategorySummary() {
  const monthIncome = useBudgetMonthIncome()
  const allIncomeTransactionIds = monthIncome.flatMap(inc => inc.transactionIds)
  const incomeTransactions = useCategoryTransactions(allIncomeTransactionIds)

  const monthCategories = useBudgetMonthCategories()
  const allCategoryTransactionIds = monthCategories.flatMap(cat => cat.transactionIds)
  const categoryTransactions = useCategoryTransactions(allCategoryTransactionIds)
  
  const expectedIncome = monthIncome.reduce((prev, curr) => prev.add(curr.expectedIncome), currency(0))
  const actualIncome = incomeTransactions.reduce((prev, curr) => prev.add(curr.amount), currency(0)).multiply(-1)
  const netIncome = actualIncome.subtract(expectedIncome)

  const expectedSpend = monthCategories.reduce((prev, curr) => prev.add(curr.budgetedAmount), currency(0))
  const actualSpend = categoryTransactions.reduce((prev, curr) => prev.add(curr.amount), currency(0))
  const netSpend = expectedSpend.subtract(actualSpend)

  return (
    <div className="summary-grid">
      <div className="label">Summary</div>
      <div className="headers">
        <div>Net Expected Income</div>
        <div>Net Actual Income</div>
        <div>Net Actual Spend</div>
      </div>
      <div>{formatCurrency(expectedIncome)}</div>
      <div>{formatCurrency(netIncome)}</div>
      <div>{formatCurrency(netSpend)}</div>
    </div>
  )
}