import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import currency from 'currency.js'
import { nanoid } from 'nanoid'

import { AppDispatch, RootState } from '@budget/store/store'
import { createIncomeCategory } from '@budget/store/slices/income.slice'

import { Tooltip } from '@components/general/tooltip/Tooltip'

import styles from './styles.module.scss'
import { NumericInput } from '@components/general/NumericInput'

export function IncomeCreator() {
  const dispatch = useDispatch<AppDispatch>()
  const currentMonth = useSelector((state: RootState) => state.budgetMonth)

  const [incomeCategoryName, setIncomeCategoryName] = useState('')
  const [expectedIncome, setExpectedIncome] = useState('')

  const handleIncomeCreate = () => {
    // Note that this only works for creating a new category from scratch.
    // It will not work for copying from a previous month -- the EOM balance
    // and previous month need set.
    dispatch(createIncomeCategory({
      id: nanoid(),
      budgetMonth: currentMonth,
      name: incomeCategoryName,
      expectedIncome: currency(0).toString(),
      transactionIds: []
    }))

    setIncomeCategoryName('')
  }

  const handleExpectedIncomeChange = (value: string) => {
    setExpectedIncome(value)
  }

  return (
    <div className="income-creator creation-group">
      <div className="label">Create Income Category <Tooltip onClick={() => alert('TODO Income')}/></div>
      {/* TODO: Add form validation logic so that empty group/category names are impossible */}
      <input
        id='income-name-input'
        className='category-input'
        type='text'
        placeholder='Income category name'
        value={incomeCategoryName}
        onChange={(v) => setIncomeCategoryName(v.target.value)}
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
        Create Income Category
      </button>
    </div>
  )
}