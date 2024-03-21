import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { updateIncomeCategory } from '@budget/store/slices/income.slice'
import { AppDispatch } from '@budget/store/store'

import { IncomeMonth } from '@budget/models/incomeMonth.model'

import { Modal } from '@components/general/modal/Modal'
import { NumericInput } from '@components/general/NumericInput'

type Props = {
  incomeCategory: IncomeMonth
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