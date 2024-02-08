import { CategoryGroup } from '@budget/models/categoryGroup.model'
import React, { useContext, useState } from 'react'

import currency from 'currency.js'
import { nanoid } from 'nanoid'

import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { BudgetMonthContext } from '@budget/page'
import { NumericInput } from '@components/general/NumericInput'

type Props = {
  onCategoryCreate: (category: CategoryMonth) => void
  onGroupCreate: (group: CategoryGroup) => void
}

export function CategoryCreator({ onCategoryCreate, onGroupCreate }: Props) {
  const budgetMonth = useContext(BudgetMonthContext)

  const [categoryName, setCategoryName] = useState('')
  const [budgetAmt, setBudgetAmt] = useState('')
  const [groupName, setGroupName] = useState('')

  const handleBudgetChange = (value: string) => {
    let sanitizedValue = value.replace(/[^\d.]/g, '')
    setBudgetAmt(sanitizedValue)
  }

  const handleCategoryCreate = () => {
    // Note that this only works for creating a new category from scratch.
    // It will not work for copying from a previous month -- the EOM balance
    // and previous month need set.
    onCategoryCreate({
      id: nanoid(),
      name: categoryName,
      budgetedAmount: currency(budgetAmt),
      additionalIncome: currency(0),
      transactions: [],
      endOfMonthAdjust: currency(0),
      endOfMonthBalance: currency(budgetAmt),
      balanceForward: currency(0),
      budgetMonth
    })

    setCategoryName('')
    setBudgetAmt('')
  }

  const handleGroupCreate = () => {
    onGroupCreate({
      id: nanoid(),
      name: groupName,
      categories: [],
      budgetMonth
    })
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