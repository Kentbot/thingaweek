import React from 'react'

import { useCategoryTransactions } from '@/budget/store/selectors'

import { formatCurrency } from '@/budget/services/currency.service'
import { sortTransactionsByDate } from '@/budget/services/transaction.service'

import { ExpenseCategory } from '@/budget/models/expenseCategory.model'
import currency from 'currency.js'

type Props = {
  category: ExpenseCategory
}

export function CategoryTransactionView({
  category
}: Props) {
  const transactions = sortTransactionsByDate(useCategoryTransactions(category.transactionIds))
  const transactionTotal = transactions.reduce((prev, curr) => prev.add(curr.amount), currency(0))

  return (
    <div className="category-transactions">
      <div className="label">Transactions</div>
      <div className="headers">
        <div>Description</div>
        <div>Amount</div>
        <div className="date">Date</div>
      </div>
      {transactions.map((trans, index) =>
        <div key={trans.id} className={`row ${index % 2 === 0 ? 'highlight' : ''}`}>
          <div>{trans.description}</div>
          <div>{formatCurrency(trans.amount)}</div>
          <div className="date">{trans.date}</div>
        </div>
      )}
      <div className="totals-row">
        <div>Total:</div>
        <div>{formatCurrency(transactionTotal)}</div>
        <div>{/* date column */}</div>
      </div>
    </div>
  )
}