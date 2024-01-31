import { CategoryMonth } from '@budget/models/categoryMonth.model'
import currency from 'currency.js'
import { nanoid } from 'nanoid'
import React, { useState } from 'react'

type Props = {
  onCategoryCreate: (category: CategoryMonth) => void
}

export function CategoryCreator({ onCategoryCreate }: Props) {
  const [name, setName] = useState('')
  const [budgetAmt, setBudgetAmt] = useState('')

  const handleBudgetChange = (value: string) => {
    let sanitizedValue = value.replace(/[^\d.]/g, '')
    setBudgetAmt(sanitizedValue)
  }

  const handleCategoryCreate = () => {
    onCategoryCreate({
      id: nanoid(),
      name: name,
      budgetedAmount: currency(budgetAmt).value,
      transactions: [],
      endOfMonthAdjust: 0,
      endOfMonthBalance: 0,
      previousMonth: null
    })
  }

  return (
    <>
      <input
        id='name-input'
        type='text'
        placeholder='Category name'
        value={name}
        onChange={(v) => setName(v.target.value)}
      />
      <input
        id='budget-amt-input'
        type='text'
        placeholder='Budgeted amount'
        value={budgetAmt}
        onChange={(v) => handleBudgetChange(v.target.value)}
      />
      <button onClick={handleCategoryCreate}>Save</button>
    </>
  )
}