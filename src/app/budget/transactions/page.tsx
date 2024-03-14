'use client'

import React, { ChangeEvent } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

import { AppDispatch, RootState } from '@budget/store/store'
import { createTransactions, deleteTransaction } from '@budget/store/slices/transaction.slice'
import { assignCategoryTransaction } from '@budget/store/slices/category.slice'
import { useBudgetMonthCategories, useBudgetMonthIncome, useBudgetMonthTransactions } from '@budget/store/selectors'

import { parseCsv } from '@budget/services/csvParser.service'
import { getCsvRowKeys, transformCsvRows } from '@budget/services/csvTransformer.service'

import { Transaction } from '@budget/models/transaction.model'
import { assignIncomeTransaction, unassignTransaction } from '@budget/store/actions'

import { Dropdown, DropdownOption } from '@components/general/dropdown/Dropdown'

import './styles.scss'

const categoryGroup = 'Categories'
const incomeGroup = 'Income Categories'

type Group = typeof categoryGroup | typeof incomeGroup

export default function Transactions() {
  const dispatch = useDispatch<AppDispatch>()
  const budgetMonth = useSelector((state: RootState) => state.budgetMonth)
  const transactions = useBudgetMonthTransactions()

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
        dispatch(assignCategoryTransaction({ categoryId: value, transactionId: transId }))
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
        { transactions?.map((trans: Transaction, i) => (
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