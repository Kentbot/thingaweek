import React, { ChangeEvent, useMemo, useState } from 'react'

import { Transaction } from '@/budget/models/transaction.model'
import { parseCsv } from '../services/csvInput.service'

export function Transactions() {
  const [ transactions, setTransactions ] = useState<Transaction[] | null>(null)
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const data = await parseCsv(file)
      setTransactions(data)
    }
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
          </tr>
        </thead>
        <tbody>
          { transactions?.map((trans: Transaction) => {
            console.log('hier', trans)
            return (
            <tr key={trans.id}>
              <td>{trans.id}</td>
              <td>{trans.description}</td>
              <td>{trans.amount}</td>
              <td>{trans.date.invalidReason ?? trans.date.toISODate()}</td>
            </tr>
          )
          })}
        </tbody>
      </table>
    </>
  )
}