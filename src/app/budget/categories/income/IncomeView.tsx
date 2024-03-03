import React from 'react'

import currency from 'currency.js'

import { useBudgetMonthIncome, useBudgetMonthTransactions, useCategoryTransactions } from '@budget/store/selectors'

import './styles.scss'
import { IncomeMonth } from '@budget/models/incomeMonth.model'

export function IncomeView() {
  const allTransactions = useBudgetMonthTransactions()

  const totalIncome = allTransactions.reduce(
    (prev, curr) => currency(curr.amount).value < 0 ? currency(curr.amount).add(prev) : prev, currency(0)
  )
  const totalSpend = allTransactions.reduce(
    (prev, curr) => currency(curr.amount).value > 0 ? currency(curr.amount).add(prev) : prev, currency(0)
  )
  const netBalance = totalIncome.add(totalSpend)

  const income = useBudgetMonthIncome()
  
  return (
    <div className="income-grid">
      <div className="label">Income</div>
      <div className="income-header">
        <div>Name</div>
        <div>Expected</div>
        <div>Actual</div>
        <div>Net</div>
      </div>
      {income.map(inc => (
        <React.Fragment key={inc.id}>
          <IncomeRow incomeCategory={inc} />
        </React.Fragment>
      ))}
    </div>
  )
}

function IncomeRow({ incomeCategory }: { incomeCategory: IncomeMonth }) {
  const incomeTransactions = useCategoryTransactions(incomeCategory.transactionIds)
  const actualIncome = incomeTransactions.reduce((prev, curr) => currency(curr.amount).add(prev), currency(0)).toString()
  
  return (
    <>
      <div>{incomeCategory.name}</div>
      <div>{incomeCategory.expectedIncome}</div>
      <div>{actualIncome}</div>
      <div>{currency(incomeCategory.expectedIncome).add(actualIncome).toString()}</div>
    </>
  )
}