import React, { ChangeEvent } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@budget/store/store'
import { createTransactions, deleteTransaction } from '@budget/store/transaction.slice'
import { assignTransaction } from '@budget/store/category.slice'
import { Transaction } from '@budget/models/transaction.model'
import { parseCsv } from '@budget/services/csvParser.service'
import { getCsvRowKeys, transformCsvRows } from '@budget/services/csvTransformer.service'

import './styles.scss'

type Props = {}

export function Transactions({}: Props) {
  const dispatch = useDispatch()
  const budgetMonth = useSelector((state: RootState) => state.budgetMonth)
  const transactions = useSelector((state: RootState) => state.transactions)
  const categories = useSelector((state: RootState) => state.categories)

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
    dispatch(deleteTransaction({ id: transId }))
  }

  const handleAssignTransactionToCategory = (transId: string, catId: string) => {
    dispatch(assignTransaction({ categoryId: catId, transactionId: transId }))
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
            <div>{trans.amount.value}</div>
            <div>{trans.date.invalidReason ?? trans.date.toISODate()}</div>
            <div>
              <select className="category-select" onChange={(v) => handleAssignTransactionToCategory(trans.id, v.target.value)}>
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