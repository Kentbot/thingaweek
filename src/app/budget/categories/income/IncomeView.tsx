import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import currency from 'currency.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

import { updateIncomeCategory } from '@budget/store/slices/income.slice'
import { AppDispatch } from '@budget/store/store'
import { useBudgetMonthIncome, useCategoryTransactions } from '@budget/store/selectors'

import { Modal } from '@components/general/modal/Modal'
import { NumericInput } from '@components/general/NumericInput'
import { EditIncomeModal } from './EditIncomeModal'

import { IncomeCategory } from '@budget/models/incomeCategory.model'

import './styles.scss'

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