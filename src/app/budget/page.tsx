'use client'

import React, { useState } from 'react'

import { Transactions } from './components/Transactions'
import { Categories } from './components/Categories'
import { Transaction } from './models/transaction.model'
import { CategoryMonth } from './models/categoryMonth.model'

export default function Budget() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<CategoryMonth[]>([])
  return (
    <>
      This be the budget
      <Categories
        categories={categories}
        onCategoriesChanged={(c) => setCategories(c)} />
      <Transactions
        categories={categories}
        transactions={transactions}
        onTransactionsChanged={(t) => setTransactions(t)} />
    </>
  )
}