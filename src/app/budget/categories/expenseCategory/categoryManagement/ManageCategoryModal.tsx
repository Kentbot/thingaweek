import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import currency from 'currency.js'

import { AppDispatch } from '@budget/store/store'
import { updateExpenseCategory } from '@budget/store/slices/expenseCategory.slice'

import { ExpenseCategory } from '@budget/models/expenseCategory.model'

import { Validator } from '@budget/services/category.service'

import { Modal } from '@components/general/modal/Modal'
import { NumericInput } from '@components/general/NumericInput'
import { CategoryTransactionView } from './CategoryTransactionView'

import './styles.scss'

type Props = {
  expenseCategory: ExpenseCategory
  editModalOpen: boolean
  onOpen: () => void
  onCancel: () => void
  onEditConfirm: () => void
}

export function ManageCategoryModal({
  expenseCategory,
  editModalOpen,
  onOpen,
  onCancel,
  onEditConfirm
}: Props) {
  const dispatch = useDispatch<AppDispatch>()

  const [expenseCategoryName, setExpenseCategoryName] = useState(expenseCategory.name)
  const [budgetAmount, setBudgetAmount] = useState(expenseCategory.budgetedAmount)
  const [additionalIncome, setAdditionalIncome] = useState(expenseCategory.additionalIncome)
  const [eomAdjust, setEomAdjust] = useState(expenseCategory.endOfMonthAdjust)
  const [nameIsValid, setNameIsValid] = useState(true)

  const handleNameChange = (value: string) => {
    if (!nameIsValid) {
      setNameIsValid(true)
    }
    setExpenseCategoryName(value)
  }

  const handleIncomeUpdate = () => {
    const updatedCategory: ExpenseCategory = {
      ...expenseCategory,
      name: expenseCategoryName,
      additionalIncome: currency(additionalIncome).toString(),
      budgetedAmount: currency(budgetAmount).toString(),
      endOfMonthAdjust: currency(eomAdjust).toString()
    }
    
    const isValid = Validator.category(updatedCategory)
    setNameIsValid(isValid)

    if (!isValid) {
      return
    }

    dispatch(updateExpenseCategory(updatedCategory))

    onEditConfirm()
  }

  return (
    <Modal
      toggleButtonIcon={<FontAwesomeIcon icon={faEllipsis} />}
      title={<div>Manage Expense Category - {expenseCategory.name}</div>}
      isOpen={editModalOpen}
      onOpen={onOpen}
      buttonStyle={{ width: '24px', padding: '0', justifySelf: 'center' }}
    >
      <div className="edit-category-grid">
        <div>Category Name</div>
        <div>Budgeted Amount</div>
        <div>Additional Income</div>
        <div>EOM Adjust</div>
        <input
          id={`income-name-input-${expenseCategory.id}`}
          className={`category-input ${!nameIsValid ? 'invalid' : ''}`}
          type='text'
          placeholder='Income category name'
          value={expenseCategoryName}
          onChange={(v) => handleNameChange(v.target.value)}
        />
        <NumericInput
          id={`budget-amt-input-${expenseCategory.id}`}
          className='category-input'
          type='text'
          placeholder='Budget Amount'
          value={budgetAmount}
          onValueUpdate={(v) => setBudgetAmount(v)}
        />
        <NumericInput
          id={`addl-income-input-${expenseCategory.id}`}
          className='category-input'
          type='text'
          placeholder='Additional Income'
          value={additionalIncome}
          onValueUpdate={(v) => setAdditionalIncome(v)}
        />
        <NumericInput
          id={`eom-adjust-input-${expenseCategory.id}`}
          className='category-input'
          type='text'
          placeholder='End of Month (EOM) Adjust'
          value={eomAdjust}
          onValueUpdate={(v) => setEomAdjust(v)}
        />
      </div>
      <CategoryTransactionView category={expenseCategory} />
      <button className="btn" onClick={handleIncomeUpdate}>
        Save Changes
      </button>
      <button className="btn" onClick={() => onCancel()}>Cancel</button>
    </Modal>
  )
}