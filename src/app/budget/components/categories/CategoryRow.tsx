import React, { useEffect, useRef, useState } from 'react'

import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { NumericInput } from '@components/general/NumericInput'

import currency from 'currency.js'

type Props = {
  category: CategoryMonth,
  onCategoryUpdated: (category: CategoryMonth) => void
}

export function CategoryRow({ category, onCategoryUpdated }: Props) {
  const spend = category.transactions.reduce(
    (prev, curr) => curr.amount.add(prev), currency(0)
  )
  const balance = currency(category.budgetedAmount).subtract(spend)

  return (
    <>
      <div className="col-2">{category.name}</div>
      <div>{category.balanceForward.value ?? '0.00'}</div>
      <NewValueUpdater
        valueToUpdate={category.budgetedAmount.value.toString()}
        onValueSet={(value) => onCategoryUpdated({ ...category, budgetedAmount: currency(value) })}
      />
      <NewValueUpdater
        valueToUpdate={category.additionalIncome.value.toString()}
        onValueSet={(value) => onCategoryUpdated({ ...category, additionalIncome: currency(value) })}
      />
      <div className="col-2">{spend.value}</div>
      <div>{balance.value}</div>
      <NewValueUpdater
        valueToUpdate={category.endOfMonthAdjust.value.toString()}
        onValueSet={(value) => onCategoryUpdated({ ...category, endOfMonthAdjust: currency(value) })}
      />
      <div>{category.endOfMonthBalance.value}</div>
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