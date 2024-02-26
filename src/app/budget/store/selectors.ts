import { createSelector } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'
import { useSelector } from 'react-redux'

import { filterToBudgetMonth } from '@budget/services/category.service'
import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { Transaction } from '@budget/models/transaction.model'

import { RootState } from './store'
import { ISODateString } from './types'

export const useBudgetMonthTransactions = (budgetMonth: ISODateString): Transaction[] => {
  const selectTransactions = createSelector(
    (state: RootState) => state.transactions,
    (transactions) => filterToBudgetMonth(transactions, DateTime.fromISO(budgetMonth))
  )
  return useSelector(selectTransactions)
}

export const useBudgetMonthCategories = (budgetMonth: ISODateString): CategoryMonth[] => {
  const selectCategories = createSelector(
    (state: RootState) => state.categories,
    (categories) => filterToBudgetMonth(categories, DateTime.fromISO(budgetMonth))
  )
  return useSelector(selectCategories)
}

// export const useBudgetMonthIncome = (budgetMonth: ISODateString) => {
//   const selectCategories = createSelector(
//     (state: RootState) => state.categories.incomeCategories,
//     (categories) => filterToBudgetMonth(categories, DateTime.fromISO(budgetMonth))[0]
//   )
//   return useSelector(selectCategories)
// }

export const useBudgetMonthGroups = (budgetMonth: ISODateString) => {
  const selectGroups = createSelector(
    (state: RootState) => state.groups,
    (groups) => filterToBudgetMonth(groups, DateTime.fromISO(budgetMonth))
  )
  return useSelector(selectGroups)
}

export const useCategoryTransactions = (category: CategoryMonth) => {
  const selectCategoryTransactions = createSelector(
    (state: RootState) => state.transactions,
    (transactions) => transactions.filter(t => category.transactionIds.includes(t.id)))
  return useSelector(selectCategoryTransactions)
}