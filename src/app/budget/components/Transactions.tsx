import React, { ChangeEvent, useMemo, useState } from 'react'

import { Transaction } from '@/budget/models/transaction.model'
import { parseCsv } from '../services/csvParser.service'
import { getCsvRowKeys, transformCsvRows } from '../services/csvTransformer.service'

export function Transactions() {
  const [ transactions, setTransactions ] = useState<Transaction[] | null>(null)
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const rawData = await parseCsv(file)
      const csvRowKeys = getCsvRowKeys(rawData)
      const data = transformCsvRows(rawData, csvRowKeys)
      setTransactions(data)
    }
  }

  const removeTransaction = (transId: string) => {
    setTransactions(transactions?.filter((t) => t.id !== transId) ?? [])
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
              <td><button onClick={() => removeTransaction(trans.id)}>x</button></td>
            </tr>
          ))} 
        </tbody>
      </table>
    </>
  )
}