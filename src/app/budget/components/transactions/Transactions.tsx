import React, { ChangeEvent } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@budget/store/store'
import { createTransactions } from '@budget/store/slices/transaction.slice'
import { assignTransaction } from '@budget/store/slices/category.slice'
import { useBudgetMonthCategories, useBudgetMonthTransactions } from '@budget/store/selectors'

import { parseCsv } from '@budget/services/csvParser.service'
import { getCsvRowKeys, transformCsvRows } from '@budget/services/csvTransformer.service'

import { Transaction } from '@budget/models/transaction.model'

import './styles.scss'
import { deleteTransactionThunk } from '@budget/store/thunks'

type Props = {}

export function Transactions({}: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const budgetMonth = useSelector((state: RootState) => state.budgetMonth)
  const transactions = useBudgetMonthTransactions(budgetMonth)
  const categories = useBudgetMonthCategories(budgetMonth)

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

  const handleAssignTransactionToCategory = (transId: string, catId: string) => {
    dispatch(assignTransaction({ categoryId: catId, transactionId: transId, allTransactions: transactions }))
  }

  return (
    <>
      <input type='file' onChange={handleFileUpload} />
      <div className='transaction-grid'>
        <div>Desc</div>
        <div>Amt</div>
        <div>Date</div>
        <div>Category</div>
        <div>Delete</div>
        { transactions?.map((trans: Transaction) => (
          <React.Fragment key={trans.id}>
            <div>{trans.description}</div>
            <div>{trans.amount}</div>
            <div>{trans.date}</div>
            <div>
              <select
                className="category-select"
                onChange={(v) => handleAssignTransactionToCategory(trans.id, v.target.value)}
                value={categories.find(c => c.transactionIds.includes(trans.id))?.id}
              >
                <option value={undefined}>-</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div><button onClick={() => removeTransaction(trans.id)}>x</button></div>
          </React.Fragment>
        ))}
      </div>
    </>
  )
}