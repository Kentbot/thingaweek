'use client'

import React, { useState } from 'react'

import { DateTime } from 'luxon'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { AppDispatch } from '@budget/store/store'
import { deleteTransaction } from '@budget/store/slices/transaction.slice'
import { assignTransactionToExpense } from '@budget/store/slices/expenseCategory.slice'
import { useBudgetMonthCategories, useBudgetMonthIncome, useBudgetMonthTransactions } from '@budget/store/selectors'

import { Transaction } from '@budget/models/transaction.model'
import { assignIncomeTransaction, unassignTransaction } from '@budget/store/actions'

import { Dropdown, DropdownOption } from '@components/general/dropdown/Dropdown'

import './styles.scss'
import { TransactionUploader } from './TransactionUploader'
import { sortTransactionsByDate } from '@budget/services/transaction.service'

const categoryGroup = 'Categories'
const incomeGroup = 'Income Categories'

type Group = typeof categoryGroup | typeof incomeGroup

export default function Transactions() {
  const dispatch = useDispatch<AppDispatch>()
  
  const [viewAssigned, setViewAssigned] = useState(false)

  const transactions = useBudgetMonthTransactions()
  const categories = useBudgetMonthCategories()
  const incomeCategories = useBudgetMonthIncome()

  let filteredTransactions = transactions
  if (!viewAssigned) {
    filteredTransactions = transactions
      .filter(t => 
        !categories.some(c => c.transactionIds.includes(t.id)) &&
        !incomeCategories.some(c => c.transactionIds.includes(t.id))
      )
  }
  filteredTransactions = sortTransactionsByDate(filteredTransactions)

  const categoryOptions: (DropdownOption & { transactionIds: string[] })[] = useBudgetMonthCategories()
    .map(cat => ({ display: cat.name, value: cat.id, group: categoryGroup, transactionIds: cat.transactionIds }))

  const incomeCategoryOptions: (DropdownOption & { transactionIds: string[] })[] = useBudgetMonthIncome()
    .map(inc => ({ display: inc.name, value: inc.id, group: incomeGroup, transactionIds: inc.transactionIds }))

  const removeTransaction = (transId: string) => {
    dispatch(deleteTransaction({ transactionId: transId }))
  }

  const handleAssignTransaction = (transId: string, group: Group, value?: string) => {
    if (value) {
      if (group === categoryGroup) {
        dispatch(assignTransactionToExpense({ categoryId: value, transactionId: transId }))
      } else {
        dispatch(assignIncomeTransaction({ incomeId: value, transactionId: transId }))
      }
    } else {
      dispatch(unassignTransaction({ transactionId: transId }))
    }
  }

  return (
    <>
      <TransactionUploader />
      <button className="btn" onClick={() => setViewAssigned(!viewAssigned)}>
        { viewAssigned ?
          <><FontAwesomeIcon icon={faEye}/> Hide</> :
          <><FontAwesomeIcon icon={faEyeSlash}/> Show</> } Assigned transactions
      </button>
      <div className='transaction-grid'>
        <div className="label">Transactions</div>
        <div className="header">
          <div>Description</div>
          <div>Amount</div>
          <div>Date</div>
          <div>Category</div>
          <div></div>
        </div>
        { filteredTransactions?.map((trans: Transaction, i) => (
          <div className={`transaction-row ${i % 2 === 1 ? 'highlight' : ''}`} key={trans.id}>
            <div>{trans.description}</div>
            <div>{trans.amount}</div>
            <div>{trans.date}</div>
            <div className="category-select">
              <Dropdown
                initialOption={
                  categoryOptions.find(c => c.transactionIds.includes(trans.id)) ??
                  incomeCategoryOptions.find(c => c.transactionIds.includes(trans.id))
                }
                onSelect={(option) => handleAssignTransaction(trans.id, option.group as Group, option.value)}
                options={[...categoryOptions, ...incomeCategoryOptions]}
              />
            </div>
            <button className="btn delete-trans-button" onClick={() => removeTransaction(trans.id)}>
              x
            </button>
          </div>
        ))}
      </div>
    </>
  )
}