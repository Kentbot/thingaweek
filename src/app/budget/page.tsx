'use client'

import React, { useState } from 'react'

import { Transactions } from './components/Transactions'
import { Categories } from './components/Categories'
import { Transaction } from './models/transaction.model'
import { CategoryMonth } from './models/categoryMonth.model'

export default function Budget() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<CategoryMonth[]>([])

  const assignTransToCategory = (transId: string, catId: string) => {
    setCategories(categories.map((c) => {
      // Remove transaction from any other categories
      c.transactions = c.transactions.filter((t) => t.id !== transId)

      // Add transaction to relevant category
      if (c.id === catId) {
        const transaction = transactions.find((t) => t.id === transId)

        if (transaction) c.transactions.push(transaction)
        else throw new Error('Attempted to add a non-existed transaction')
      }

      return c
    }))
  }

  const removeTransaction = (transId: string) => {
    setTransactions(transactions?.filter((t) => t.id !== transId) ?? [])
    setCategories(categories.map((c) => {
      // Remove transaction from all categories
      c.transactions = c.transactions.filter((t) => t.id !== transId)
      return c
    }))
  }

  return (
    <>
      <Categories
        categories={categories}
        onCategoryAdded={(c) => setCategories([...categories, c])} />
      <Transactions
        categories={categories}
        transactions={transactions}
        onTransactionsUploaded={setTransactions}
        onAssignTransactionToCategory={assignTransToCategory}
        onRemoveTransaction={removeTransaction}
      />
    </>
  )
}