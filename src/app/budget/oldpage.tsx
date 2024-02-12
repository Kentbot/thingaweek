'use client'

import React, { createContext, useMemo, useState } from 'react'

import currency from 'currency.js'
import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'

import { Transactions } from './components/transactions/Transactions'
import { Categories } from './components/categories/Categories'
import { DateSelector } from './components/dateSelector/DateSelector'
import { Transaction } from './models/transaction.model'
import { CategoryMonth } from './models/categoryMonth.model'
import { CategoryGroup } from './models/categoryGroup.model'
import { calculateEomBalance } from './services/category.service'

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
      c.transactionIds = c.transactionIds.filter((tid) => tid !== transId)

      // Add transaction to relevant category
      if (c.id === catId) {
        c.transactionIds.push(transId)
      }

      return c
    }))
  }

  const removeTransaction = (transId: string) => {
    setTransactions(transactions?.filter((t) => t.id !== transId) ?? [])
    setCategories(categories.map((c) => {
      // Remove transaction from all categories
      c.transactionIds = c.transactionIds.filter((tid) => tid !== transId)
      return c
    }))
  }

  const handleCategoryMovedToGroup = (groupId: string, categoryId: string) => {
    setCategoryGroups(categoryGroups.map(g => {
      // First remove the category from any other groups
      g.categoryIds = g.categoryIds.filter(cid => cid !== categoryId)

      if (g.id === groupId) {
        g.categoryIds.push(categoryId)
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
        newCat.balanceForward = prev.endOfMonthBalance
        newCat.endOfMonthBalance = calculateEomBalance(newCat, transactions)
      } else {
        newCat.endOfMonthBalance = calculateEomBalance(cat, transactions)
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
    const prevMonthGroups = categoryGroups.filter(g =>
      g.budgetMonth.year === prevMonth.year &&
      g.budgetMonth.month === prevMonth.month)

    const copiedGroups: CategoryGroup[] = []
    
    const groupCatMap: { [oldCatId: string]: string } = {}
    for (let prevGroup of prevMonthGroups) {
      const newGroupId = nanoid()
      const oldCatIds = prevGroup.categoryIds

      for (const oldCatId of oldCatIds) {
        groupCatMap[oldCatId] = newGroupId
      }

      copiedGroups.push({
        id: newGroupId,
        budgetMonth: currentBudgetMonth,
        categoryIds: [],
        name: prevGroup.name
      })
    }

    const copiedCategories: CategoryMonth[] = []
    for (let prevCat of prevMonthCategories) {
      const newCatId = nanoid()

      // If this category belonged to a group, we re-add it to the newly
      // created group
      const newGroup = groupCatMap[prevCat.id]
      if (newGroup) {
        copiedGroups.find(g => g.id === newGroup)?.categoryIds.push(newCatId)
      }

      const copiedCat: CategoryMonth = {
        id: newCatId,
        additionalIncome: currency(0),
        balanceForward: prevCat.endOfMonthBalance,
        budgetMonth: currentBudgetMonth,
        budgetedAmount: prevCat.budgetedAmount,
        endOfMonthAdjust: currency(0),
        endOfMonthBalance: prevCat.budgetedAmount.add(prevCat.endOfMonthBalance),
        name: prevCat.name,
        transactionIds: [],
      }
      
      copiedCategories.push(copiedCat, { ...prevCat, nextMonthId: copiedCat.id })
    }
    const unaffectedCategories = categories.filter(c => !prevMonthCategories.some(pc => pc.id === c.id))

    const newCategories = [...unaffectedCategories, ...copiedCategories]
    setCategories(newCategories)
    setCategoryGroups([...categoryGroups, ...copiedGroups])
  }

  const handleRemoveCategory = (categoryId: string) => {
    // Need to handle linked categories/groups
    setCategoryGroups(categoryGroups.map(g => ({
      ...g,
      categoryIds: g.categoryIds.filter(cid => cid !== categoryId)
    })))
    setCategories(categories.filter(c => c.id !== categoryId))
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
            transactions={transactions}
            onCategoryCreated={(c) => setCategories([...categories, c])}
            onCategoryRemoved={handleRemoveCategory}
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