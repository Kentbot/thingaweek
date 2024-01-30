import { nanoid } from 'nanoid'
import currency from 'currency.js'

import { Transaction } from '@budget/models/transaction.model'
import { rawDateToDateTime } from './date.service'

interface CsvKeysDefinition {
  date: string,
  description: string,
  debit: string,
  credit?: string,
}

export function getCsvRowKeys(rawRows: unknown[]): CsvKeysDefinition {
  const rawRowKeys = Object.keys((rawRows as any[])[0])

  const dateKey = rawRowKeys.find((key) => key.toLowerCase() === 'date')
  const descriptionKey = rawRowKeys.find((key) => key.toLowerCase() === 'description')
  const debitKey = rawRowKeys.find((key) => key.toLowerCase() === 'debit' || key.toLowerCase() === 'amount')
  const creditKey = rawRowKeys.find((key) => key.toLowerCase() === 'credit')

  const errors = []

  if (!dateKey) errors.push('Invalid date key')
  if (!descriptionKey) errors.push('Invalid description key')
  if (!debitKey) errors.push('Invalid debit key')

  if (errors.length > 0) throw new Error(`Invalid CSV row. Errors: ${errors}`)

  return {
    date: dateKey as string,
    debit: debitKey as string,
    description: descriptionKey as string,
    credit: creditKey
  }
}

export function transformCsvRows(rawRows: unknown[], keys: CsvKeysDefinition): Transaction[] {
  const result = (rawRows as any[]).map((raw) => {
    let amount: number
    
    // If a credit exists, we want to convert it to a negative value.
    // Since transactions only have an "amount", it needs to be negative
    // in the case of a credit to the account.
    const rawCredit = raw[keys?.credit ?? '']
    if (rawCredit?.length > 0) {
      const credit = currency(rawCredit)
      amount = credit.value > 0 ? credit.multiply(-1).value : credit.value
    } else {
      amount = currency(raw[keys.debit]).value
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