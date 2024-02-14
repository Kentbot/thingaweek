import { createSelector } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

import { filterToBudgetMonth } from '@budget/services/category.service'
import { RootState } from './store'
import { ISODateString } from './types'
import { useSelector } from 'react-redux'

export const useBudgetMonthTransactions = (budgetMonth: ISODateString) => {
  const selectTransactions = createSelector(
    (state: RootState) => state.transactions,
    (transactions) => filterToBudgetMonth(transactions, DateTime.fromISO(budgetMonth))
  )
  return useSelector(selectTransactions)
}

export const useBudgetMonthCategories = (budgetMonth: ISODateString) => {
  const selectCategories = createSelector(
    (state: RootState) => state.categories,
    (categories) => filterToBudgetMonth(categories, DateTime.fromISO(budgetMonth))
  )
  return useSelector(selectCategories)
}

export const useBudgetMonthGroups = (budgetMonth: ISODateString) => {
  const selectGroups = createSelector(
    (state: RootState) => state.groups,
    (groups) => filterToBudgetMonth(groups, DateTime.fromISO(budgetMonth))
  )
  return useSelector(selectGroups)
}