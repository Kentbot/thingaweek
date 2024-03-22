import { createSelector } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import { useSelector } from 'react-redux'

import { filterToBudgetMonth } from '@budget/services/category.service'
import { ExpenseCategory } from '@budget/models/expenseCategory.model'
import { Transaction } from '@budget/models/transaction.model'
import { IncomeCategory } from '@budget/models/incomeCategory.model'

import { RootState } from './store'

export const useBudgetMonthTransactions = (): Transaction[] => {
  const selectTransactions = createSelector(
    (state: RootState) => state,
    (state => filterToBudgetMonth(state.transactions, DateTime.fromISO(state.budgetMonth)))
  )
  return useSelector(selectTransactions)
}

export const useBudgetMonthCategories = (): ExpenseCategory[] => {
  const selectCategories = createSelector(
    (state: RootState) => state,
    (state) => filterToBudgetMonth(state.categories, DateTime.fromISO(state.budgetMonth))
  )
  return useSelector(selectCategories)
}

export const useUngroupedCategories = (): ExpenseCategory[] => {
  const selectCategories = createSelector(
    (state: RootState) => state,
    (state) => {
      const catIdsInGroups = state.groups.flatMap(g => g.categoryIds)
      const ungroupedCats = state.categories.filter(cat => !catIdsInGroups.includes(cat.id))

      return filterToBudgetMonth(ungroupedCats, DateTime.fromISO(state.budgetMonth))
    }
  )
  return useSelector(selectCategories)
}

export const useBudgetMonthGroups = () => {
  const selectGroups = createSelector(
    (state: RootState) => state,
    (state) => filterToBudgetMonth(state.groups, DateTime.fromISO(state.budgetMonth))
  )
  return useSelector(selectGroups)
}

export const useCategoryTransactions = (transactionIds: string[]) => {
  const selectCategoryTransactions = createSelector(
    (state: RootState) => state.transactions,
    (transactions) => transactions.filter(t => transactionIds.includes(t.id)))
  return useSelector(selectCategoryTransactions)
}

export const useBudgetMonthIncome = (): IncomeCategory[] => {
  const selectGroups = createSelector(
    (state: RootState) => state,
    (state) => filterToBudgetMonth(state.income, DateTime.fromISO(state.budgetMonth))
  )
  return useSelector(selectGroups)
}