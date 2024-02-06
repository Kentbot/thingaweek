'use client'

import React, { createContext, useMemo, useState } from 'react'

import { DateTime } from 'luxon'

import { Transactions } from './components/transactions/Transactions'
import { Categories } from './components/categories/Categories'
import { DateSelector } from './components/dateSelector/DateSelector'
import { Transaction } from './models/transaction.model'
import { CategoryMonth } from './models/categoryMonth.model'
import { CategoryGroup } from './models/categoryGroup.model'

import './styles.scss'

const defaultDate = DateTime.now()

export const BudgetMonthContext = createContext<DateTime>(defaultDate)

export default function Budget() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<CategoryMonth[]>([])
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([])
  const [currentBudgetMonth, setCurrentBudgetMonth] = useState<DateTime>(defaultDate)

  const currentCategories = useMemo(() => {
    return categories.filter(c =>
      c.budgetMonth.year === currentBudgetMonth.year &&
      c.budgetMonth.month === currentBudgetMonth.month)
  },
  [categories, currentBudgetMonth])

  const currentGroups = useMemo(() => {
    return categoryGroups.filter(c =>
      c.budgetMonth.year === currentBudgetMonth.year &&
      c.budgetMonth.month === currentBudgetMonth.month)
  },
  [categoryGroups, currentBudgetMonth])

  const currentTransactions = useMemo(() => {
    return transactions.filter(t =>
      t.budgetMonth.year === currentBudgetMonth.year &&
      t.budgetMonth.month === currentBudgetMonth.month)
  },
  [transactions, currentBudgetMonth])

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

  const handleMonthChange = (month: number) => {
    console.log('month select', month)
    setCurrentBudgetMonth(DateTime.local(currentBudgetMonth.year, month))
  }

  const handleYearChange = (year: number) => {
    console.log('year select', year)
    setCurrentBudgetMonth(DateTime.local(year, currentBudgetMonth.month))
  }

  return (
    <BudgetMonthContext.Provider value={currentBudgetMonth}>
      <div className="budget">
        <div className="date-selector">
          <DateSelector
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
          />
        </div>
        <div className="categories">
          <Categories
            categories={currentCategories}
            groups={currentGroups}
            onCategoryCreated={(c) => setCategories([...categories, c])}
            onCategoryGroupCreated={(g) => setCategoryGroups([...categoryGroups, g])}
            onCategoryMovedToGroup={handleCategoryMovedToGroup}
          />
        </div>
        <div className="transactions">
          <Transactions
            categories={currentCategories}
            transactions={currentTransactions}
            onTransactionsUploaded={(t) => setTransactions([...transactions, ...t])}
            onAssignTransactionToCategory={assignTransToCategory}
            onRemoveTransaction={removeTransaction}
          />
        </div>
      </div>
    </BudgetMonthContext.Provider>
  )
}