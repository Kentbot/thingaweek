import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import currency from 'currency.js'

import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { NumericInput } from '@components/general/NumericInput'
import { AppDispatch, RootState } from '@budget/store/store'
import { deleteCategory, updateCategory } from '@budget/store/category.slice'
import { createSelector } from '@reduxjs/toolkit'

type Props = {
  category: CategoryMonth
}

export function CategoryRow({ category }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const selectCategoryTransactions = createSelector(
    (state: RootState) => state.transactions,
    (transactions) => transactions.filter(t => category.transactionIds.includes(t.id)))
  const categoryTransactions = useSelector(selectCategoryTransactions)
  const allTransactions = useSelector((state: RootState) => state.transactions)

  const spend = categoryTransactions.reduce(
    (prev, curr) => currency(curr.amount).add(prev), currency(0)
  )
  const balance = currency(category.budgetedAmount).subtract(spend)

  return (
    <>
      <div className="col-2">{category.name}</div>
      <div>{category.balanceForward ?? '0.00'}</div>
      <NewValueUpdater
        valueToUpdate={category.budgetedAmount}
        onValueSet={(value) => dispatch(updateCategory({ updatedCategory: { ...category, budgetedAmount: currency(value).toString() }, transactions: allTransactions }))}
      />
      <NewValueUpdater
        valueToUpdate={category.additionalIncome}
        onValueSet={(value) => dispatch(updateCategory({ updatedCategory: { ...category, additionalIncome: currency(value).toString() }, transactions: allTransactions  }))}
      />
      <div className="col-2">{spend.value}</div>
      <div>{balance.value}</div>
      <NewValueUpdater
        valueToUpdate={category.endOfMonthAdjust}
        onValueSet={(value) => dispatch(updateCategory({updatedCategory: { ...category, endOfMonthAdjust: currency(value).toString() }, transactions: allTransactions  }))}
      />
      <div>{category.endOfMonthBalance}</div>
      <button onClick={() => dispatch(deleteCategory({ id: category.id }))}>x</button>
    </>
  )
}

function NewValueUpdater({ valueToUpdate, onValueSet }: { valueToUpdate: string, onValueSet: (newValue: string) => void }) {
  const numericInputRef = useRef<HTMLInputElement>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [newValue, setNewValue] = useState(valueToUpdate.replace(/\.(0{2,}\d*)/, ''))

  useEffect(() => {
    if (isUpdating) {
      numericInputRef.current?.focus()
    }
  }, [isUpdating])

  return (
    <>
      { isUpdating ?
        <NumericInput
          className='new-value-updater'
          value={newValue.replace(/^0+/g, '')}
          onValueUpdate={(v) => setNewValue(v)}
          onBlur={() => {
            onValueSet(newValue)
            setIsUpdating(false)
          }}
          ref={numericInputRef}
        /> :
        <div onClick={() => setIsUpdating(true)}>
          {valueToUpdate}
        </div>
      }
    </>
  )
}