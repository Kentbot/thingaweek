import React, { ChangeEvent, useMemo, useState } from 'react'

import { Transaction } from '@budget/models/transaction.model'
import { parseCsv } from '@budget/services/csvParser.service'
import { getCsvRowKeys, transformCsvRows } from '@budget/services/csvTransformer.service'
import { CategoryMonth } from '@budget/models/categoryMonth.model'

import './styles.scss'

type Props = {
  categories: CategoryMonth[]
  transactions: Transaction[]
  onTransactionsUploaded: (transactions: Transaction[]) => void
  onAssignTransactionToCategory: (transactionId: string, categoryId: string) => void
  onRemoveTransaction: (transactionId: string) => void
}

export function Transactions({
  categories,
  transactions,
  onTransactionsUploaded,
  onAssignTransactionToCategory,
  onRemoveTransaction
}: Props) {
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const rawData = await parseCsv(file)
      const csvRowKeys = getCsvRowKeys(rawData)
      const data = transformCsvRows(rawData, csvRowKeys)
      onTransactionsUploaded(data)
    }
  }

  const removeTransaction = (transId: string) => {
    onRemoveTransaction(transId)
  }

  const handleAssignTransactionToCategory = (transId: string, catId: string) => {
    onAssignTransactionToCategory(transId, catId)
  }

  return (
    <>
      <input type='file' onChange={handleFileUpload} />
      <div className='transaction-grid'>
        <div className='header'>
          <div>Id</div>
          <div>Desc</div>
          <div>Amt</div>
          <div>Date</div>
          <div>Category</div>
          <div>Delete</div>
        </div>
        <div>
          { transactions?.map((trans: Transaction) => (
            <tr key={trans.id}>
              <td>{trans.id}</td>
              <td>{trans.description}</td>
              <td>{trans.amount}</td>
              <td>{trans.date.invalidReason ?? trans.date.toISODate()}</td>
              <td>
                <select onChange={(v) => handleAssignTransactionToCategory(trans.id, v.target.value)}>
                  <option value={undefined}>-</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </td>
              <td><button onClick={() => removeTransaction(trans.id)}>x</button></td>
            </tr>
          ))} 
        </div>
      </div>
    </>
  )
}