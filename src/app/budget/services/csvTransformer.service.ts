import { nanoid } from 'nanoid'
import currency from 'currency.js'

import { Transaction } from '@budget/models/transaction.model'
import { rawDateToDateTime } from './date.service'

interface CsvKeysDefinition {
  date: string,
  description: string,
  debit?: string,
  credit?: string,
  amount?: string
}

export function getCsvRowKeys(rawRows: unknown[]): CsvKeysDefinition {
  const rawRowKeys = Object.keys((rawRows as any[])[0])

  const dateKey = rawRowKeys.find((key) => key.toLowerCase() === 'date')
  const descriptionKey = rawRowKeys.find((key) => key.toLowerCase() === 'description')
  const debitKey = rawRowKeys.find((key) => key.toLowerCase() === 'debit')
  const creditKey = rawRowKeys.find((key) => key.toLowerCase() === 'credit')
  const amountKey = rawRowKeys.find((key) => key.toLowerCase() === 'amount')

  const errors = []

  if (!dateKey) errors.push('Invalid date key')
  if (!descriptionKey) errors.push('Invalid description key')
  if (!debitKey && !creditKey && !amountKey) errors.push('Missing key for amount')
  if ((debitKey && !creditKey) || (!debitKey && creditKey))
    errors.push(`Credit/debit key missing, both must be defined together. Credit: '${creditKey}' Debit: '${debitKey}'`)

  if (errors.length > 0) throw new Error(`Invalid CSV row. Errors: ${errors}`)

  return {
    amount: amountKey as string,
    date: dateKey as string,
    debit: debitKey as string,
    description: descriptionKey as string,
    credit: creditKey
  }
}

export function transformCsvRows(rawRows: unknown[], keys: CsvKeysDefinition): Transaction[] {
  const result = (rawRows as any[]).map((raw) => {
    let amount: currency
    
    if (keys.amount) {
      // Handle debit (checking/saving) accounts
      amount = currency(raw[keys.amount]).multiply(-1)
    } else {
      // Handle credit (credit card) accounts
      // If a credit exists, we want to convert it to a negative value.
      // Since transactions only have an "amount", it needs to be negative
      // in the case of a credit to the account.
      const rawCredit = raw[keys?.credit ?? '']
      if (rawCredit?.length > 0) {
        const credit = currency(rawCredit)
        amount = credit.value > 0 ? credit.multiply(-1) : credit
      } else {
        amount = currency(raw[keys?.debit ?? ''])
      }
    }

    const date = rawDateToDateTime(raw[keys.date])
    const description = raw[keys.description]

    const transaction: Transaction = {
      amount,
      date,
      description,
      id: nanoid()
    }

    return transaction
  })

  return result
}