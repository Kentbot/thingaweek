import React, { ChangeEvent, useMemo, useState } from 'react'

import { Transaction } from '@budget/models/transaction.model'
import { parseCsv } from '@budget/services/csvParser.service'
import { getCsvRowKeys, transformCsvRows } from '@budget/services/csvTransformer.service'
import { CategoryMonth } from '@budget/models/categoryMonth.model'

type Props = {
  categories: CategoryMonth[]
  transactions: Transaction[]
  onTransactionsChanged: (transactions: Transaction[]) => void
}

export function Transactions({ categories, transactions, onTransactionsChanged }: Props) {
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const rawData = await parseCsv(file)
      const csvRowKeys = getCsvRowKeys(rawData)
      const data = transformCsvRows(rawData, csvRowKeys)
      onTransactionsChanged(data)
    }
  }

  const removeTransaction = (transId: string) => {
    onTransactionsChanged(transactions?.filter((t) => t.id !== transId) ?? [])
  }

  return (
    <>
      <input type='file' onChange={handleFileUpload} />
      <table>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Desc</th>
            <th scope='col'>Amt</th>
            <th scope='col'>Date</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          { transactions?.map((trans: Transaction) => (
            <tr key={trans.id}>
              <td>{trans.id}</td>
              <td>{trans.description}</td>
              <td>{trans.amount}</td>
              <td>{trans.date.invalidReason ?? trans.date.toISODate()}</td>
              <td>
                <select>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </td>
              <td><button onClick={() => removeTransaction(trans.id)}>x</button></td>
            </tr>
          ))} 
        </tbody>
      </table>
    </>
  )
}