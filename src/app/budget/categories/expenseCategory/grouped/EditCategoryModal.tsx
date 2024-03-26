import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { AppDispatch } from '@budget/store/store'

import { ExpenseCategory } from '@budget/models/expenseCategory.model'

import { Modal } from '@components/general/modal/Modal'
import { NumericInput } from '@components/general/NumericInput'
import { Validator } from '@budget/services/category.service'
import { updateExpenseCategory } from '@budget/store/slices/expenseCategory.slice'
import currency from 'currency.js'

type Props = {
  expenseCategory: ExpenseCategory
  editModalOpen: boolean
  onEditOpen: () => void
  onEditConfirm: () => void
}

export function EditCategoryModal({
  expenseCategory,
  editModalOpen,
  onEditOpen,
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
      toggleButtonIcon={<FontAwesomeIcon icon={faPencil} />}
      title={`Edit Expense Category - ${expenseCategory.name}`}
      isOpen={editModalOpen}
      onOpen={onEditOpen}
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
          id={`budget-amt-input-${expenseCategory.id}`}
          className='category-input'
          type='text'
          placeholder='Additional Income'
          value={additionalIncome}
          onValueUpdate={(v) => setAdditionalIncome(v)}
        />
        <NumericInput
          id={`budget-amt-input-${expenseCategory.id}`}
          className='category-input'
          type='text'
          placeholder='End of Month (EOM) Adjust'
          value={eomAdjust}
          onValueUpdate={(v) => setEomAdjust(v)}
        />
      </div>
      <button className="btn" onClick={handleIncomeUpdate}>
        Confirm Updates
      </button>
      {/* <button className="btn" onClick={() => setEditModalOpen(false)}>Cancel</button> */}
    </Modal>
  )
}