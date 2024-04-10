import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Modal } from '@/components/general/modal/Modal'
import { NumericInput } from '@/components/general/NumericInput'

import { updateIncomeCategory } from '@/budget/store/slices/incomeCategory.slice'
import { AppDispatch } from '@/budget/store/store'

import { IncomeCategory } from '@/budget/models/incomeCategory.model'

import { Validator } from '@/budget/services/category.service'

type Props = {
  incomeCategory: IncomeCategory
  editModalOpen: boolean
  onEditOpen: () => void
  onEditConfirm: () => void
}

export function EditIncomeModal({
  incomeCategory,
  editModalOpen,
  onEditOpen,
  onEditConfirm
}: Props) {
  const dispatch = useDispatch<AppDispatch>()

  const [incomeCategoryName, setIncomeCategoryName] = useState(incomeCategory.name)
  const [expectedIncome, setExpectedIncome] = useState(incomeCategory.expectedIncome)
  const [nameIsValid, setNameIsValid] = useState(true)

  const handleNameChange = (value: string) => {
    if (!nameIsValid) {
      setNameIsValid(true)
    }
    setIncomeCategoryName(value)
  }

  const handleExpectedIncomeChange = (value: string) => {
    setExpectedIncome(value)
  }

  const handleIncomeUpdate = () => {
    const updatedCategory: IncomeCategory = {
      ...incomeCategory,
      name: incomeCategoryName,
      expectedIncome: expectedIncome,
    }

    const isValid = Validator.category(updatedCategory)
    // TODO: Create finer grained validation detail
    setNameIsValid(isValid)

    if (!isValid) {
      return
    }

    dispatch(updateIncomeCategory(updatedCategory))

    onEditConfirm()
  }

  return (
    <Modal
      toggleButtonIcon={<FontAwesomeIcon icon={faPencil} />}
      title={`Edit Income Category - ${incomeCategory.name}`}
      isOpen={editModalOpen}
      onOpen={onEditOpen}
    >
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
      {/* <button className="btn" onClick={() => setEditModalOpen(false)}>Cancel</button> */}
    </Modal>
  )
}