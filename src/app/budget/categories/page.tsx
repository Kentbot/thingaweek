'use client'

import React, { useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import currency from 'currency.js'

import { AppDispatch, RootState } from '@budget/store/store'
import { assignCategoryToGroup } from '@budget/store/slices/group.slice'
import { useBudgetMonthCategories, useBudgetMonthGroups, useBudgetMonthIncome, useBudgetMonthTransactions, useCategoryTransactions } from '@budget/store/selectors'

import { CategoryCreator } from './CategoryCreator'
import { GroupSelector } from './GroupSelector'
import { CategoryRow } from './CategoryRow'

import './styles.scss'

type Props = {}

export default function Categories({}: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const currentMonth = useSelector((state: RootState) => state.budgetMonth)
  const allTransactions = useBudgetMonthTransactions(currentMonth)
  const groups = useBudgetMonthGroups(currentMonth)
  const categories = useBudgetMonthCategories(currentMonth)
  const incomeCategory = useBudgetMonthIncome(currentMonth)

  const totalIncome = allTransactions.reduce(
    (prev, curr) => currency(curr.amount).value < 0 ? currency(curr.amount).add(prev) : prev, currency(0)
  )
  const totalSpend = allTransactions.reduce(
    (prev, curr) => currency(curr.amount).value > 0 ? currency(curr.amount).add(prev) : prev, currency(0)
  )
  const netBalance = totalIncome.add(totalSpend)

  const ungroupedCategories = useMemo(
    () => {
      const catIdsInGroups = groups.flatMap(g => g.categoryIds)
      const ungroupedCats = categories.filter(cat => !catIdsInGroups.includes(cat.id))

      return ungroupedCats
    },
    [categories, groups])

  const handleGroupSelect = (groupId: string, categoryId: string) => {
    dispatch(assignCategoryToGroup({ groupId, categoryId }))
  }

  return (
    <>
      <CategoryCreator />
      <div className="income-category">
        {incomeCategory?.name} {totalIncome.toString()} Total Spend: {totalSpend.toString()} Net Balance: {netBalance.toString()}
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
        { ungroupedCategories.map((cat, index) => (
          <div className={"category-row" + (index % 2 === 1 ? " highlight" : "")} key={cat.id}>
            <div className="col-2 group-select">
              <GroupSelector
                groups={groups}
                onGroupSelect={(gid) => handleGroupSelect(gid, cat.id)}
              />
            </div>
            <CategoryRow
              category={cat}
            />
          </div>
        ))}
        { groups.map((group) => {
          const groupCategories = categories.filter(c => group.categoryIds.includes(c.id))
          return (
            <div key={group.id} className="group">
              <div className="name">{group.name}</div>
              {groupCategories.map((cat, index) => (
                <div key={cat.id} className={index % 2 === 0 ? "group-category" : "group-category highlight"}>
                  <CategoryRow
                    category={cat}
                  />
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}
