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

import { IncomeMonth } from '@budget/models/incomeMonth.model'

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

function IncomeRow({ incomeCategory }: { incomeCategory: IncomeMonth }) {
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
      <Modal
        toggleButtonIcon={<FontAwesomeIcon icon={faPencil} />}
        title={`Edit Income Category - ${incomeCategory.name}`}
        isOpen={editModalOpen}
      >
        <EditIncome incomeCategory={incomeCategory} onEditConfirm={handleEditConfirm} />
      </Modal>
    </>
  )
}

function EditIncome({ incomeCategory, onEditConfirm }: { incomeCategory: IncomeMonth, onEditConfirm: () => void }) {
  const dispatch = useDispatch<AppDispatch>()

  const [incomeCategoryName, setIncomeCategoryName] = useState(incomeCategory.name)
  const [expectedIncome, setExpectedIncome] = useState(incomeCategory.expectedIncome)
  const [nameIsValid, setNameIsValid] = useState(true)

  const handleNameChange = (value: string) => {
    if (!nameIsValid) {
      setNameIsValid(validateName(value))
    }
    setIncomeCategoryName(value)
  }

  const validateName = (name: string) => {
    return name.length > 0
  }

  const handleExpectedIncomeChange = (value: string) => {
    setExpectedIncome(value)
  }

  const handleIncomeUpdate = () => {
    const isValidName = validateName(incomeCategoryName)
    setNameIsValid(isValidName)

    if (!isValidName) {
      return
    }

    dispatch(updateIncomeCategory({
      ...incomeCategory,
      name: incomeCategoryName,
      expectedIncome: expectedIncome,
    }))

    onEditConfirm()
  }

  return (
    <>
      <input
        id={`income-name-input-${incomeCategory.id}`}
        className={`category-input ${!nameIsValid ? 'invalid' : ''}`}
        type='text'
        placeholder='Income category name'
        value={incomeCategoryName}
        onChange={(v) => handleNameChange(v.target.value)}
      />
      <NumericInput
        id={`budget-amt-input-${incomeCategory.id}`}
        className='category-input'
        type='text'
        placeholder='Expected Income'
        value={expectedIncome}
        onValueUpdate={(v) => handleExpectedIncomeChange(v)}
      />
      <button className="btn" onClick={handleIncomeUpdate}>
        Confirm Updates
      </button>
    </>
  )
}