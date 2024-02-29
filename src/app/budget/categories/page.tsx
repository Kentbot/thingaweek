'use client'

import React from 'react'

import currency from 'currency.js'

import { useBudgetMonthTransactions } from '@budget/store/selectors'

import { CategoryCreator } from './creationControls/categoryCreator/CategoryCreator'
import { GroupCreator } from './creationControls/groupCreator/GroupCreator'
import { MonthCarryover } from './creationControls/monthCarryover/MonthCarryover'
import { UngroupedCategories } from './groupDisplay/ungroupedCategories/UngroupedCategories'
import { GroupedCategories } from './groupDisplay/groupedCategories/GroupedCategories'

import './styles.scss'

export default function CategoriesPage() {
  const allTransactions = useBudgetMonthTransactions()

  const totalIncome = allTransactions.reduce(
    (prev, curr) => currency(curr.amount).value < 0 ? currency(curr.amount).add(prev) : prev, currency(0)
  )
  const totalSpend = allTransactions.reduce(
    (prev, curr) => currency(curr.amount).value > 0 ? currency(curr.amount).add(prev) : prev, currency(0)
  )
  const netBalance = totalIncome.add(totalSpend)

  return (
    <>
      <div className="creation-controls">
        <CategoryCreator />
        <GroupCreator />
        <MonthCarryover />
      </div>
      <UngroupedCategories />
      <div className="income-category">
        {'Income'} {totalIncome.toString()} Total Spend: {totalSpend.toString()} Net Balance: {netBalance.toString()}
      </div>
      <GroupedCategories />
    </>
  )
}
