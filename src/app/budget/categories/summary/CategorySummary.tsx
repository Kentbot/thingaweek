import React from 'react'

import currency from 'currency.js'

import { useBudgetMonthCategories, useBudgetMonthIncome, useCategoryTransactions } from '@budget/store/selectors'
import { formatCurrency } from '@budget/services/currency.service'

import './styles.scss'

export function CategorySummary() {
  const monthIncome = useBudgetMonthIncome()
  const allIncomeTransactionIds = monthIncome.flatMap(inc => inc.transactionIds)
  const incomeTransactions = useCategoryTransactions(allIncomeTransactionIds)

  const expectedIncome = monthIncome.reduce((prev, curr) => prev.add(curr.expectedIncome), currency(0))
  const actualIncome = incomeTransactions.reduce((prev, curr) => prev.add(curr.amount), currency(0)).multiply(-1)
  
  const monthCategories = useBudgetMonthCategories()
  const allCategoryTransactionIds = monthCategories.flatMap(cat => cat.transactionIds)
  const categoryTransactions = useCategoryTransactions(allCategoryTransactionIds)

  const expectedSpend = monthCategories.reduce((prev, curr) => prev.add(curr.budgetedAmount), currency(0))
  const actualSpend = categoryTransactions.reduce((prev, curr) => prev.add(curr.amount), currency(0))
  const netSpend = actualSpend.subtract(expectedSpend)

  const additionalIncome = monthCategories.reduce((prev, curr) => prev.add(curr.additionalIncome), currency(0))

  const surplusIncome = actualIncome.subtract(expectedIncome).subtract(additionalIncome)

  const expectedIncomeVsSpend = expectedIncome.subtract(expectedSpend)

  const totalEomAdjust = monthCategories.reduce((prev, curr) => prev.add(curr.endOfMonthAdjust), currency(0))

  return (
    <div className="summary-grid">
      <div className="label">Summary</div>
      <div id="income-v-spend">
        <div className="header">Income vs Spend Expected</div>
        <div>{formatCurrency(expectedIncomeVsSpend)}</div>
      </div>
      <div id="surplus-income">
        <div className="header">Surplus Income</div>
        <div>{formatCurrency(surplusIncome)}</div>
      </div>
      <div id="net-spend">
        <div className="header">Net Spend (vs. Expected)</div>
        <div>{formatCurrency(netSpend)}</div>
      </div>
      <div id="eom-adjust">
        <div className="header">Total EOM Adjust</div>
        <div>{formatCurrency(totalEomAdjust)}</div>
      </div>
    </div>
  )
}