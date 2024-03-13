import React, { useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import currency from 'currency.js'
import { nanoid } from 'nanoid'

import { NumericInput } from '@components/general/NumericInput'
import { Tooltip } from '@components/general/tooltip/Tooltip'

import { AppDispatch, RootState } from '@budget/store/store'
import { createCategory } from '@budget/store/slices/category.slice'

import './styles.scss'

export function CategoryCreator() {
  const dispatch = useDispatch<AppDispatch>()
  const currentMonth = useSelector((state: RootState) => state.budgetMonth)

  const nameRef = useRef<HTMLInputElement>(null)

  const [categoryName, setCategoryName] = useState('')
  const [nameIsValid, setNameIsValid] = useState(true)
  const [budgetAmt, setBudgetAmt] = useState('')

  const handleNameChange = (value: string) => {
    if (!nameIsValid) {
      setNameIsValid(validateName(value))
    }
    setCategoryName(value)
  }

  const validateName = (name: string) => {
    return name.length > 0
  }

  const handleBudgetChange = (value: string) => {
    setBudgetAmt(value)
  }

  const handleCategoryCreate = () => {
    const isValidName = validateName(categoryName)
    setNameIsValid(isValidName)

    if (!isValidName) {
      return
    }

    // Note that this only works for creating a new category from scratch.
    // It will not work for copying from a previous month -- the EOM balance
    // and previous month need set.
    dispatch(createCategory({
      id: nanoid(),
      name: categoryName,
      additionalIncome: currency(0).toString(),
      budgetedAmount: currency(budgetAmt).toString(),
      endOfMonthAdjust: currency(0).toString(),
      transactionIds: [],
      budgetMonth: currentMonth,
      linkedMonths: {}
    }))

    setCategoryName('')
    setBudgetAmt('')
  }

  return (
    <div className="category-creator creation-group">
      <div className="label">Create New Category <Tooltip onClick={() => alert('TODO Category')}/></div>
      {/* TODO: Add form validation logic so that empty group/category names are impossible */}
      <input
        ref={nameRef}
        id='category-name-input'
        className={`category-input ${!nameIsValid ? 'invalid' : ''}`}
        type='text'
        placeholder='Category name'
        value={categoryName}
        onChange={(v) => handleNameChange(v.target.value)}
      />
      <NumericInput
        id='budget-amt-input'
        className='category-input'
        type='text'
        placeholder='Budgeted amount'
        value={budgetAmt}
        onValueUpdate={(v) => handleBudgetChange(v)}
      />
      <button className="btn" onClick={handleCategoryCreate}>
        Add Category
      </button>
    </div>
  )
}