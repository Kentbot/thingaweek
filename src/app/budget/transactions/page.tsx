'use client'

import React, { ChangeEvent } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

import { AppDispatch, RootState } from '@budget/store/store'
import { deleteTransactionThunk } from '@budget/store/thunks'
import { createTransactions } from '@budget/store/slices/transaction.slice'
import { assignCategoryTransaction } from '@budget/store/slices/category.slice'
import { useBudgetMonthCategories, useBudgetMonthIncome, useBudgetMonthTransactions } from '@budget/store/selectors'

import { parseCsv } from '@budget/services/csvParser.service'
import { getCsvRowKeys, transformCsvRows } from '@budget/services/csvTransformer.service'

import { Transaction } from '@budget/models/transaction.model'
import { assignIncomeTransaction } from '@budget/store/actions'

import './styles.scss'

export default function Transactions() {
  const dispatch = useDispatch<AppDispatch>()
  const budgetMonth = useSelector((state: RootState) => state.budgetMonth)
  const transactions = useBudgetMonthTransactions()
  const categoryOptions = useBudgetMonthCategories()
    .map(c => ({ value: `cat-${c.id}`, name: c.name, transactions: c.transactionIds }))
  const incomeCategoryOptions = useBudgetMonthIncome()
    .map(c => ({ value: `inc-${c.id}`, name: c.name, transactions: c.transactionIds }))

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
    dispatch(deleteTransactionThunk(transId))
  }

  const handleAssignTransaction = (transId: string, value: string) => {
    if (value.startsWith('cat-')) {
      dispatch(assignCategoryTransaction({ categoryId: value.replace('cat-', ''), transactionId: transId, allTransactions: transactions }))
    } else {
      dispatch(assignIncomeTransaction({ incomeId: value.replace('inc-', ''), transactionId: transId, allTransatcions: transactions }))
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
            <div>
              <select
                className="category-select"
                onChange={(event) => handleAssignTransaction(trans.id, event.target.value)}
                value={
                  (
                    categoryOptions.find(c => c.transactions.includes(trans.id))?.value ||
                    incomeCategoryOptions.find(i => i.transactions.includes(trans.id))?.value
                  )
                }
              >
                <option value={undefined}>-</option>
                <optgroup label="Categories">
                  {categoryOptions.map((c) => (
                    <option key={c.value} value={c.value}>{c.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Income">
                  {incomeCategoryOptions.map((c) => (
                    <option key={c.value} value={c.value}>{c.name}</option>
                  ))}
                </optgroup>
              </select>
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