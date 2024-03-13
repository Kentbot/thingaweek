import React from 'react'

import currency from 'currency.js'

import { useBudgetMonthIncome, useBudgetMonthTransactions, useCategoryTransactions } from '@budget/store/selectors'

import './styles.scss'
import { IncomeMonth } from '@budget/models/incomeMonth.model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

export function IncomeView() {
  const income = useBudgetMonthIncome()
  
  return (
    <div className="income-grid">
      <div className="label">Income</div>
      <div className="income-header">
        <div>Name</div>
        <div>Expected</div>
        <div>Actual</div>
        <div>Diff</div>
        <div>{/* Edit control */}</div>
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
  const actualIncome = incomeTransactions
    .reduce((prev, curr) => currency(curr.amount).add(prev), currency(0))
    .multiply(-1)
    .toString()
  
  return (
    <>
      <div>{incomeCategory.name}</div>
      <div>{incomeCategory.expectedIncome}</div>
      <div>{actualIncome}</div>
      <div>{currency(actualIncome).subtract(incomeCategory.expectedIncome).toString()}</div>
      <button className="btn">
        <FontAwesomeIcon icon={faPencil} />
      </button>
    </>
  )
}