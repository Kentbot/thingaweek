import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import currency from 'currency.js'
import { nanoid } from 'nanoid'

import { NumericInput } from '@components/general/NumericInput'

import { AppDispatch, RootState } from '@budget/store/store'
import { createCategory } from '@budget/store/slices/category.slice'

import './styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

export function CategoryCreator() {
  const dispatch = useDispatch<AppDispatch>()
  const currentMonth = useSelector((state: RootState) => state.budgetMonth)

  const [categoryName, setCategoryName] = useState('')
  const [budgetAmt, setBudgetAmt] = useState('')

  const handleBudgetChange = (value: string) => {
    setBudgetAmt(value)
  }

  const handleCategoryCreate = () => {
    // Note that this only works for creating a new category from scratch.
    // It will not work for copying from a previous month -- the EOM balance
    // and previous month need set.
    dispatch(createCategory({
      id: nanoid(),
      name: categoryName,
      additionalIncome: currency(0).toString(),
      balanceForward: currency(0).toString(),
      budgetedAmount: currency(budgetAmt).toString(),
      endOfMonthAdjust: currency(0).toString(),
      endOfMonthBalance: currency(budgetAmt).toString(),
      transactionIds: [],
      budgetMonth: currentMonth
    }))

    setCategoryName('')
    setBudgetAmt('')
  }

  return (
    <div className="category-creator creation-group">
      <div className="label">Create New Category <span className="tooltip-btn">?</span></div>
      {/* TODO: Add form validation logic so that empty group/category names are impossible */}
      <input
        id='category-name-input'
        className='category-input'
        type='text'
        placeholder='Category name'
        value={categoryName}
        onChange={(v) => setCategoryName(v.target.value)}
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