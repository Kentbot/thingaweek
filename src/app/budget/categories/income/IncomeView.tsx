import React, { useState } from 'react'

import currency from 'currency.js'

import { useBudgetMonthIncome, useCategoryTransactions } from '@budget/store/selectors'

import { IncomeCategory } from '@budget/models/incomeCategory.model'

import { EditIncomeModal } from './EditIncomeModal'

import './styles.scss'
import { formatCurrency } from '@budget/services/currency.service'

export function IncomeView() {
  const income = useBudgetMonthIncome()

  const expectedTotal = income.reduce((prev, curr) => prev.add(currency(curr.expectedIncome)), currency(0))

  const allIncomeTransIds = income.reduce((prev, curr) => prev.concat(curr.transactionIds), [] as string[])
  const allIncomeTrans = useCategoryTransactions(allIncomeTransIds)
  const actualTotal = allIncomeTrans
    .reduce((prev, curr) => currency(curr.amount).add(prev), currency(0))
    .multiply(-1)

  const totalDifference = actualTotal.subtract(expectedTotal)
  
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
      <div className="income-total">
        <div>Totals:</div>
        <div>{formatCurrency(expectedTotal)}</div>
        <div>{formatCurrency(actualTotal)}</div>
        <div>{formatCurrency(totalDifference)}</div>
        <div>{/* Empty for edit control */}</div>
      </div>
    </div>
  )
}

function IncomeRow({ incomeCategory }: { incomeCategory: IncomeCategory }) {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const incomeTransactions = useCategoryTransactions(incomeCategory.transactionIds)
  const actualIncome = incomeTransactions
    .reduce((prev, curr) => currency(curr.amount).add(prev), currency(0))
    .multiply(-1)
    .toString()

  const handleEditConfirm = () => {
    setEditModalOpen(false)
  }
  
  return (
    <>
      <div>{incomeCategory.name}</div>
      <div>{incomeCategory.expectedIncome}</div>
      <div>{actualIncome}</div>
      <div>{currency(actualIncome).subtract(incomeCategory.expectedIncome).toString()}</div>
      <EditIncomeModal
        editModalOpen={editModalOpen}
        incomeCategory={incomeCategory}
        onEditConfirm={handleEditConfirm}
        onEditOpen={() => setEditModalOpen(true)}
      />
    </>
  )
}