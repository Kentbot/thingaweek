'use client'

import React, { ChangeEvent, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faUpload } from '@fortawesome/free-solid-svg-icons'

import { AppDispatch, RootState } from '@budget/store/store'
import { createTransactions, deleteTransaction } from '@budget/store/slices/transaction.slice'
import { assignTransactionToExpense } from '@budget/store/slices/expenseCategory.slice'
import { useBudgetMonthCategories, useBudgetMonthIncome, useBudgetMonthTransactions } from '@budget/store/selectors'

import { parseCsv } from '@budget/services/csvParser.service'
import { getCsvRowKeys, transformCsvRows } from '@budget/services/csvTransformer.service'

import { Transaction } from '@budget/models/transaction.model'
import { assignIncomeTransaction, unassignTransaction } from '@budget/store/actions'

import { Dropdown, DropdownOption } from '@components/general/dropdown/Dropdown'

import './styles.scss'
import { DateTime } from 'luxon'

const categoryGroup = 'Categories'
const incomeGroup = 'Income Categories'

type Group = typeof categoryGroup | typeof incomeGroup

export default function Transactions() {
  const dispatch = useDispatch<AppDispatch>()
  
  const [viewAssigned, setViewAssigned] = useState(false)

  const budgetMonth = useSelector((state: RootState) => state.budgetMonth)
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
  filteredTransactions.sort((a, b) => {
    // Is negative if a is earlier than b
    const dateDiff = DateTime.fromISO(a.date).diff(DateTime.fromISO(b.date)).milliseconds

    return dateDiff > 0 ? 1 :
      dateDiff < 0 ? -1 :
      0
  })

  const categoryOptions: (DropdownOption & { transactionIds: string[] })[] = useBudgetMonthCategories()
    .map(cat => ({ display: cat.name, value: cat.id, group: categoryGroup, transactionIds: cat.transactionIds }))

  const incomeCategoryOptions: (DropdownOption & { transactionIds: string[] })[] = useBudgetMonthIncome()
    .map(inc => ({ display: inc.name, value: inc.id, group: incomeGroup, transactionIds: inc.transactionIds }))

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const rawData = await parseCsv(file)
      const csvRowKeys = getCsvRowKeys(rawData)
      const data = transformCsvRows(rawData, csvRowKeys, budgetMonth)
      dispatch(createTransactions(data))
    }
  }

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
      <label htmlFor="transactions-upload" className="btn">
        Load Transactions from File&nbsp;&nbsp;<FontAwesomeIcon icon={faUpload}/>
      </label>
      <button className="btn" onClick={() => setViewAssigned(!viewAssigned)}>
        { viewAssigned ?
          <><FontAwesomeIcon icon={faEye}/> Hide</> :
          <><FontAwesomeIcon icon={faEyeSlash}/> Show</> } Assigned transactions
      </button>
      <input id="transactions-upload" accept=".csv" type="file" onChange={handleFileUpload} />
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