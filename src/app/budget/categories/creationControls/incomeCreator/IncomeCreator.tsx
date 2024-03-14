import React, { useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import currency from 'currency.js'
import { nanoid } from 'nanoid'

import { AppDispatch, RootState } from '@budget/store/store'
import { createIncomeCategory } from '@budget/store/slices/income.slice'

import { Tooltip } from '@components/general/tooltip/Tooltip'
import { NumericInput } from '@components/general/NumericInput'

import styles from './styles.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons'

export function IncomeCreator() {
  const dispatch = useDispatch<AppDispatch>()
  const currentMonth = useSelector((state: RootState) => state.budgetMonth)

  const nameRef = useRef<HTMLInputElement>(null)

  const [incomeCategoryName, setIncomeCategoryName] = useState('')
  const [expectedIncome, setExpectedIncome] = useState('')
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

  const handleIncomeCreate = () => {
    const isValidName = validateName(incomeCategoryName)
    setNameIsValid(isValidName)

    if (!isValidName) {
      return
    }

    // Note that this only works for creating a new category from scratch.
    // It will not work for copying from a previous month -- the EOM balance
    // and previous month need set.
    dispatch(createIncomeCategory({
      id: nanoid(),
      budgetMonth: currentMonth,
      name: incomeCategoryName,
      expectedIncome: expectedIncome,
      transactionIds: []
    }))

    setIncomeCategoryName('')
    nameRef.current?.focus()
  }

  return (
    <div className="income-creator creation-group">
      <div className="label">
        <FontAwesomeIcon icon={faMoneyBillTrendUp}/>&nbsp;
        Income Category <Tooltip onClick={() => alert('TODO Income')}/>
      </div>
      <input
        ref={nameRef}
        id='income-name-input'
        className={`category-input ${!nameIsValid ? 'invalid' : ''}`}
        type='text'
        placeholder='Income Category name'
        value={incomeCategoryName}
        onChange={(v) => handleNameChange(v.target.value)}
      />
      <NumericInput
        id='budget-amt-input'
        className='category-input'
        type='text'
        placeholder='Expected Income'
        value={expectedIncome}
        onValueUpdate={(v) => handleExpectedIncomeChange(v)}
      />
      <button className="btn" onClick={handleIncomeCreate}>
        Create
      </button>
    </div>
  )
}