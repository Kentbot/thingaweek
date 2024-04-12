import React, { useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons'

import { AppDispatch, RootState } from '@/budget/store/store'
import { createIncomeCategory } from '@/budget/store/slices/incomeCategory.slice'

import { Tooltip } from '@/components/general/tooltip/Tooltip'
import { NumericInput } from '@/components/general/NumericInput'

import styles from './styles.module.scss'

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

    dispatch(createIncomeCategory({
      id: nanoid(),
      budgetMonth: currentMonth,
      name: incomeCategoryName,
      expectedIncome: expectedIncome,
      transactionIds: [],
      linkedMonths: {}
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
        id='expected-income-input'
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