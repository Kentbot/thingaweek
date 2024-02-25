import React, { useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import currency from 'currency.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { NumericInput } from '@components/general/NumericInput'
import { AppDispatch, RootState } from '@budget/store/store'
import { deleteCategory, updateCategory } from '@budget/store/slices/category.slice'
import { useCategoryTransactions } from '@budget/store/selectors'

type Props = {
  category: CategoryMonth
}

export function CategoryRow({ category }: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const categoryTransactions = useCategoryTransactions(category)
  const allTransactions = useSelector((state: RootState) => state.transactions)

 const spend = categoryTransactions.reduce(
    (prev, curr) => currency(curr.amount).add(prev), currency(0)
  ) 
  const balance = currency(category.budgetedAmount).subtract(spend)

  return (
    <>
      <div className="col-3">
        <TextValueUpdater
          valueToUpdate={category.name}
          onValueSet={(value) => dispatch(updateCategory({ updatedCategory: { ...category, name: value }, transactions: allTransactions }))}
        />
      </div>
      <div>{category.balanceForward ?? '0.00'}</div>
      <NumericValueUpdater
        valueToUpdate={category.budgetedAmount}
        onValueSet={(value) => dispatch(updateCategory({ updatedCategory: { ...category, budgetedAmount: currency(value).toString() }, transactions: allTransactions }))}
      />
      <NumericValueUpdater
        valueToUpdate={category.additionalIncome}
        onValueSet={(value) => dispatch(updateCategory({ updatedCategory: { ...category, additionalIncome: currency(value).toString() }, transactions: allTransactions  }))}
      />
      <div>{spend.toString()}</div>
      <div>{balance.toString()}</div>
      <NumericValueUpdater
        valueToUpdate={category.endOfMonthAdjust}
        onValueSet={(value) => dispatch(updateCategory({updatedCategory: { ...category, endOfMonthAdjust: currency(value).toString() }, transactions: allTransactions  }))}
      />
      <div>{category.endOfMonthBalance}</div>
      <button className="btn delete-cat-button" onClick={() => dispatch(deleteCategory({ id: category.id }))}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </>
  )
}

type ValueUpdaterProps = {
  valueToUpdate: string
  onValueSet: (newValue: string) => void
}

function NumericValueUpdater({ valueToUpdate, onValueSet }: ValueUpdaterProps) {
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

function TextValueUpdater({ valueToUpdate, onValueSet }: ValueUpdaterProps) {
  const textInputRef = useRef<HTMLInputElement>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [newValue, setNewValue] = useState(valueToUpdate)

  useEffect(() => {
    if (isUpdating) {
      textInputRef.current?.focus()
    }
  }, [isUpdating])

  return (
    <>
      { isUpdating ?
        <input
          className="new-value-updater"
          value={newValue.replace(/^0+/g, '')}
          onChange={(event) => setNewValue(event.target.value)}
          onBlur={() => {
            onValueSet(newValue)
            setIsUpdating(false)
          }}
          ref={textInputRef}
        /> :
        <div onClick={() => setIsUpdating(true)}>
          {valueToUpdate}
        </div>
      }
    </>
  )
}