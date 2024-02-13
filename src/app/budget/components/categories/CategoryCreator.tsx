import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import currency from 'currency.js'
import { nanoid } from 'nanoid'

import { CategoryGroup } from '@budget/models/categoryGroup.model'
import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { NumericInput } from '@components/general/NumericInput'
import { AppDispatch, RootState } from '@budget/store/store'
import { createCategory } from '@budget/store/category.slice'
import { createGroup } from '@budget/store/group.slice'

type Props = {}

export function CategoryCreator({}: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const currentMonth = useSelector((state: RootState) => state.budgetMonth)

  const [categoryName, setCategoryName] = useState('')
  const [budgetAmt, setBudgetAmt] = useState('')
  const [groupName, setGroupName] = useState('')

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

  const handleGroupCreate = () => {
    dispatch(createGroup({
      id: nanoid(),
      name: groupName,
      categoryIds: [],
      budgetMonth: currentMonth
    }))
    setGroupName('')
  }

  return (
    <>
      <div>
        <input
          id='category-name-input'
          type='text'
          placeholder='Category name'
          value={categoryName}
          onChange={(v) => setCategoryName(v.target.value)}
        />
        <NumericInput
          id='budget-amt-input'
          type='text'
          placeholder='Budgeted amount'
          value={budgetAmt}
          onValueUpdate={(v) => handleBudgetChange(v)}
        />
        <button onClick={handleCategoryCreate}>Save</button>
      </div>
      <div>
        <input
          id='group-name-input'
          type='text'
          placeholder='Category Group name'
          value={groupName}
          onChange={(v) => setGroupName(v.target.value)}
        />
        <button onClick={handleGroupCreate}>Save</button>
      </div>
    </>
  )
}