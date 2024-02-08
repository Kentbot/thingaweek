'use client'

import React, { createContext, useMemo, useState } from 'react'

import currency from 'currency.js'
import { DateTime } from 'luxon'

import { Transactions } from './components/transactions/Transactions'
import { Categories } from './components/categories/Categories'
import { DateSelector } from './components/dateSelector/DateSelector'
import { Transaction } from './models/transaction.model'
import { CategoryMonth } from './models/categoryMonth.model'
import { CategoryGroup } from './models/categoryGroup.model'
import { calculateEomBalance } from './services/category.service'

import './styles.scss'
import { nanoid } from 'nanoid'

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
    setCurrentBudgetMonth(DateTime.local(currentBudgetMonth.year, month))
  }

  const handleYearChange = (year: number) => {
    setCurrentBudgetMonth(DateTime.local(year, currentBudgetMonth.month))
  }

  const handleCategoryUpdate = (updatingCat: CategoryMonth) => {
    const relevantCats = [updatingCat]

    let nextCatId = updatingCat.nextMonthId
    while (nextCatId) {
      const nextCat = categories.find(c => c.id === nextCatId)

      if (!nextCat) {
        console.error('Skipping missing category', nextCatId)
        continue
      }
      relevantCats.push(nextCat)
      nextCatId = nextCat.nextMonthId
    }

    const relevantCatIds = relevantCats.map(c => c.id)
    
    const updatedCats = []
    let prev: CategoryMonth | undefined = undefined
    for (let cat of relevantCats) {
      let newCat: CategoryMonth = { ...cat }
      if (prev) {
        console.log('rel with prev', newCat)
        newCat.balanceForward = prev.endOfMonthBalance
        newCat.endOfMonthBalance = calculateEomBalance(newCat)
      } else {
        console.log('rel no prev', newCat)
        newCat.endOfMonthBalance = calculateEomBalance(cat)
      }
      updatedCats.push(newCat)
      prev = newCat
    }

    const unrelatedCats = categories.filter(c => !relevantCatIds.includes(c.id))

    setCategories([...unrelatedCats, ...updatedCats])
  }

  const handleMonthCarryover = () => {
    const prevMonth = currentBudgetMonth.plus({ months: -1 })
    const prevMonthCategories = categories.filter(c =>
      c.budgetMonth.year === prevMonth.year &&
      c.budgetMonth.month === prevMonth.month)
    const copiedCategories: CategoryMonth[] = prevMonthCategories.flatMap((prevCat) => {
      const copiedCat: CategoryMonth = {
        id: nanoid(),
        additionalIncome: currency(0),
        budgetMonth: currentBudgetMonth,
        budgetedAmount: prevCat.budgetedAmount,
        endOfMonthAdjust: currency(0),
        endOfMonthBalance: prevCat.budgetedAmount.add(prevCat.endOfMonthBalance),
        balanceForward: prevCat.endOfMonthBalance,
        transactions: [],
        name: prevCat.name,
      }
      
      return [copiedCat, { ...prevCat, nextMonthId: copiedCat.id }]
    })
    const unaffectedCategories = categories.filter(c => !prevMonthCategories.some(pc => pc.id === c.id))

    const result = [...unaffectedCategories, ...copiedCategories]
    setCategories(result)
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
            onCategoryUpdated={handleCategoryUpdate}
            onMonthCarryover={handleMonthCarryover}
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