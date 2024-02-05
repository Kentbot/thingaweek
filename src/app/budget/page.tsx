'use client'

import React, { useState } from 'react'

import { Transactions } from './components/transactions/Transactions'
import { Categories } from './components/categories/Categories'
import { Transaction } from './models/transaction.model'
import { CategoryMonth } from './models/categoryMonth.model'
import { CategoryGroup } from './models/categoryGroup.model'

import './styles.scss'

export default function Budget() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<CategoryMonth[]>([])
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([])

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

  const handleCategoryMovedToGroup = (groupId: string, category: CategoryMonth) => {
    setCategoryGroups(categoryGroups.map(g => {
      // First remove the category from any other groups
      g.categories = g.categories.filter(c => c.id !== category.id)

      if (g.id === groupId) {
        g.categories.push(category)
      }

      return g
    }))
  }

  return (
    <div className="budget">
      <div className="categories">
        <Categories
          categories={categories}
          groups={categoryGroups}
          onCategoryCreated={(c) => setCategories([...categories, c])}
          onCategoryGroupCreated={(g) => setCategoryGroups([...categoryGroups, g])}
          onCategoryMovedToGroup={handleCategoryMovedToGroup}
        />
      </div>
      <div className="transactions">
        <Transactions
          categories={categories}
          transactions={transactions}
          onTransactionsUploaded={setTransactions}
          onAssignTransactionToCategory={assignTransToCategory}
          onRemoveTransaction={removeTransaction}
        />
      </div>
    </div>
  )
}