import Papa from 'papaparse'

import { Transaction } from '../models/transaction.model'
import { nanoid } from 'nanoid'

export async function parseCsv(file: File): Promise<Transaction[]> {
  return new Promise((res, rej) => {
    Papa.parse(file, {
      header: true,
      complete: function(results) {
        res(transformCsvRows(results.data))
      },
      error: function() {
        rej()
      }
    })
  })
}

function transformCsvRows(rawRows: unknown[]): Transaction[] {
  const rawRowsWithIds = rawRows.map((rawRow: any) => ({ ...rawRow, id: nanoid() }))

  const result = rawRowsWithIds.map((raw) => {
    const keys = Object.keys(raw)
    
    const dateKey = keys.find((key) => key.toLowerCase() === 'date')
    const amountKey = keys.find((key) => key.toLowerCase() === 'amount' || key.toLowerCase() === 'debit')
    const creditKey = keys.find((key) => key.toLowerCase() === 'credit')
    const descriptionKey = keys.find((key) => key.toLowerCase() === 'description')

    const result: Transaction = {
      // TODO: Calculate w/ credit/debit
      amount: amountKey ? raw[amountKey] : 0,
      date: dateKey ? raw[dateKey] : 'Cannot find date',
      description: descriptionKey ? raw[descriptionKey] : 'Cannot find description',
      id: nanoid()
    }

    return result
  })
  
  return result
}