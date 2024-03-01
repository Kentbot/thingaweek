import React from 'react'

import currency from 'currency.js'

import { useBudgetMonthTransactions } from '@budget/store/selectors'

import './styles.scss'

export function IncomeView() {
  const allTransactions = useBudgetMonthTransactions()

  const totalIncome = allTransactions.reduce(
    (prev, curr) => currency(curr.amount).value < 0 ? currency(curr.amount).add(prev) : prev, currency(0)
  )
  const totalSpend = allTransactions.reduce(
    (prev, curr) => currency(curr.amount).value > 0 ? currency(curr.amount).add(prev) : prev, currency(0)
  )
  const netBalance = totalIncome.add(totalSpend)
  
  return (
    <div className="income-grid">
      <div className="label">Income</div>
      <div className="income-header">
        <div></div>
      </div>
      {'TODO: Income'} {totalIncome.toString()} Total Spend: {totalSpend.toString()} Net Balance: {netBalance.toString()}
    </div>
  )
}