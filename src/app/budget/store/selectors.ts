import { createSelector } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import { useSelector } from 'react-redux'

import { filterToBudgetMonth } from '@budget/services/category.service'
import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { Transaction } from '@budget/models/transaction.model'

import { RootState } from './store'

export const useBudgetMonthTransactions = (): Transaction[] => {
  const selectTransactions = createSelector(
    (state: RootState) => state,
    (state => filterToBudgetMonth(state.transactions, DateTime.fromISO(state.budgetMonth)))
  )
  return useSelector(selectTransactions)
}

export const useBudgetMonthCategories = (): CategoryMonth[] => {
  const selectCategories = createSelector(
    (state: RootState) => state,
    (state) => filterToBudgetMonth(state.categories, DateTime.fromISO(state.budgetMonth))
  )
  return useSelector(selectCategories)
}

export const useUngroupedCategories = (): CategoryMonth[] => {
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

export const useCategoryTransactions = (category: CategoryMonth) => {
  const selectCategoryTransactions = createSelector(
    (state: RootState) => state.transactions,
    (transactions) => transactions.filter(t => category.transactionIds.includes(t.id)))
  return useSelector(selectCategoryTransactions)
}