import React, { ChangeEvent } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { RootState } from '@budget/store/store'
import { createTransactions } from '@budget/store/slices/transaction.slice'

import { parseCsv } from '@budget/services/csvParser.service'
import { getCsvRowKeys, transformCsvRows } from '@budget/services/csvTransformer.service'

export function TransactionUploader() {
  const dispatch = useDispatch()

  const budgetMonth = useSelector((state: RootState) => state.budgetMonth)

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const rawData = await parseCsv(file)
      const csvRowKeys = getCsvRowKeys(rawData)
      const data = transformCsvRows(rawData, csvRowKeys, budgetMonth)
      dispatch(createTransactions(data))
    }
  }

  return (
    <>
      <label htmlFor="transactions-upload" className="btn">
        Load Transactions from File&nbsp;&nbsp;<FontAwesomeIcon icon={faUpload}/>
      </label>
      <input id="transactions-upload" accept=".csv" type="file" onChange={handleFileUpload} />
    </>
  )
}