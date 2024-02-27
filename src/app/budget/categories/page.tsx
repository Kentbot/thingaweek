'use client'

import React, { useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import currency from 'currency.js'

import { AppDispatch, RootState } from '@budget/store/store'
import { assignCategoryToGroup } from '@budget/store/slices/group.slice'
import { useBudgetMonthCategories, useBudgetMonthGroups, useBudgetMonthTransactions, useCategoryTransactions } from '@budget/store/selectors'

import { CategoryCreator } from './CategoryCreator'
import { GroupSelector } from './GroupSelector'
import { CategoryRow } from './CategoryRow'

import './styles.scss'
import { UngroupedCategories } from './ungrouped/UngroupedCategories'

export default function CategoriesPage() {
  const allTransactions = useBudgetMonthTransactions()
  const groups = useBudgetMonthGroups()
  const categories = useBudgetMonthCategories()

  const totalIncome = allTransactions.reduce(
    (prev, curr) => currency(curr.amount).value < 0 ? currency(curr.amount).add(prev) : prev, currency(0)
  )
  const totalSpend = allTransactions.reduce(
    (prev, curr) => currency(curr.amount).value > 0 ? currency(curr.amount).add(prev) : prev, currency(0)
  )
  const netBalance = totalIncome.add(totalSpend)

  return (
    <>
      <CategoryCreator />
      <UngroupedCategories />
      <div className="income-category">
        {'Income'} {totalIncome.toString()} Total Spend: {totalSpend.toString()} Net Balance: {netBalance.toString()}
      </div>
      <div className="categories-grid">
        <div className="header">
          <div className="col-2">Group</div>
          <div className="col-3">Description</div>
          <div>Balance Forward</div>
          <div>Budgeted Amount</div>
          <div>Additional Income</div>
          <div>Spend</div>
          <div>Available Balance</div>
          <div>EOM Adjust</div>
          <div>EOM Balance</div>
          <div></div>
        </div>
        { groups.map((group) => {
          const groupCategories = categories.filter(c => group.categoryIds.includes(c.id))
          return (
            <div key={group.id} className="group">
              <div className="name">{group.name}</div>
              <div className="group-categories">
                {groupCategories.map((cat, index) => (
                  <div key={cat.id} className={index % 2 === 0 ? "group-category" : "group-category highlight"}>
                    <CategoryRow
                      category={cat}
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
