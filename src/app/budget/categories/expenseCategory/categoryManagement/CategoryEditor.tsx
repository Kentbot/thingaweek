import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import currency from 'currency.js'

import { NumericInput } from '@/components/general/NumericInput'

import { updateExpenseCategory } from '@/budget/store/slices/expenseCategory.slice'
import { AppDispatch } from '@/budget/store/store'

import { ExpenseCategory } from '@/budget/models/expenseCategory.model'

import { Validator, calculateAvailableBalance } from '@/budget/services/category.service'
import { formatCurrency, validateCurrency } from '@/budget/services/currency.service'
import { useCategoryTransactions } from '@/budget/store/selectors'

type Props = {
  balanceForward: string
  expenseCategory: ExpenseCategory
  onEditConfirm: () => void
  onCancel: () => void
}

export function CategoryEditor({
  balanceForward,
  expenseCategory,
  onEditConfirm,
  onCancel
}: Props) {
  const dispatch = useDispatch<AppDispatch>()

  const [expenseCategoryName, setExpenseCategoryName] = useState(expenseCategory.name)
  const [budgetAmount, setBudgetAmount] = useState(formatCurrency(expenseCategory.budgetedAmount, false))
  const [additionalIncome, setAdditionalIncome] = useState(formatCurrency(expenseCategory.additionalIncome, false))
  const [eomAdjust, setEomAdjust] = useState(formatCurrency(expenseCategory.endOfMonthAdjust, false))
  const [nameIsValid, setNameIsValid] = useState(true)

  const transactions = useCategoryTransactions(expenseCategory.transactionIds)
  const spend = transactions.reduce((prev, curr) => prev.add(curr.amount), currency(0))

  const availableBalance = calculateAvailableBalance({
    ...expenseCategory,
    budgetedAmount: budgetAmount,
    additionalIncome: additionalIncome,
    endOfMonthAdjust: eomAdjust
  }, balanceForward, spend)

  const eomBalance = availableBalance.add(validateCurrency(eomAdjust))

  const handleNameChange = (value: string) => {
    if (!nameIsValid) {
      setNameIsValid(true)
    }
    setExpenseCategoryName(value)
  }

  const handleIncomeUpdate = () => {
    const updatedCategory: ExpenseCategory = {
      ...expenseCategory,
      name: expenseCategoryName,
      additionalIncome: formatCurrency(currency(additionalIncome), false),
      budgetedAmount: formatCurrency(currency(budgetAmount), false),
      endOfMonthAdjust: formatCurrency(currency(eomAdjust), false)
    }
    
    const isValid = Validator.category(updatedCategory)
    setNameIsValid(isValid)

    if (!isValid) {
      return
    }

    dispatch(updateExpenseCategory(updatedCategory))
    setCategoryFields(updatedCategory)

    onEditConfirm()
  }

  const handleCancel = () => {
    setCategoryFields(expenseCategory)
    onCancel()
  }

  const setCategoryFields = (category: ExpenseCategory) => {
    setExpenseCategoryName(category.name)
    setBudgetAmount(category.budgetedAmount)
    setAdditionalIncome(category.additionalIncome)
    setEomAdjust(category.endOfMonthAdjust)
  }

  return (
    <>
      <div className="edit-category-grid">
        <div>Category Name</div>
        <div>Balance Forward</div>
        <div>Budgeted Amount</div>
        <div>Additional Income</div>
        <div>Spend</div>
        <div>Available Balance</div>
        <div>EOM Adjust</div>
        <div>EOM Balance</div>
        <input
          id={`income-name-input-${expenseCategory.id}`}
          className={`category-input ${!nameIsValid ? 'invalid' : ''}`}
          type='text'
          placeholder='Income category name'
          value={expenseCategoryName}
          onChange={(v) => handleNameChange(v.target.value)}
        />
        <div>{formatCurrency(balanceForward)}</div>
        <NumericInput
          id={`budget-amt-input-${expenseCategory.id}`}
          className='category-input'
          type='text'
          placeholder='Budget Amount'
          value={budgetAmount}
          onValueUpdate={(v) => setBudgetAmount(v)}
        />
        <NumericInput
          id={`addl-income-input-${expenseCategory.id}`}
          className='category-input'
          type='text'
          placeholder='Additional Income'
          value={additionalIncome}
          onValueUpdate={(v) => setAdditionalIncome(v)}
        />
        <div>{formatCurrency(spend)}</div>
        <div>{formatCurrency(availableBalance)}</div>
        <NumericInput
          id={`eom-adjust-input-${expenseCategory.id}`}
          className='category-input'
          type='text'
          placeholder='End of Month (EOM) Adjust'
          value={eomAdjust}
          onValueUpdate={(v) => setEomAdjust(v)}
        />
        <div>{formatCurrency(eomBalance)}</div>
      </div>
      <button className="btn" onClick={handleIncomeUpdate}>
        Save Changes
      </button>
      <button className="btn" onClick={handleCancel}>
        Cancel
      </button>
    </>
  )
}