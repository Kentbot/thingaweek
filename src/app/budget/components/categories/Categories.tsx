import React, { useMemo } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { DateTime } from 'luxon'

import { carryoverMonthAction } from '@budget/store/actions'
import { AppDispatch, RootState } from '@budget/store/store'
import { assignCategoryToGroup } from '@budget/store/group.slice'

import { CategoryCreator } from './CategoryCreator'
import { GroupSelector } from './GroupSelector'
import { CategoryRow } from './CategoryRow'

import './categories.styles.scss'
import { createSelector } from '@reduxjs/toolkit'
import { filterToBudgetMonth } from '@budget/services/category.service'
import { carryoverMonth } from '@budget/store/thunks'

type Props = {}

export function Categories({}: Props) {
  const dispatch = useDispatch<AppDispatch>()
  const currentMonth = useSelector((state: RootState) => state.budgetMonth)
  const selectGroups = createSelector(
    (state: RootState) => state.groups,
    (groups) => filterToBudgetMonth(groups, DateTime.fromISO(currentMonth))
  )
  const groups = useSelector(selectGroups)
  const selectCategories = createSelector(
    (state: RootState) => state.categories,
    (categories) => filterToBudgetMonth(categories, DateTime.fromISO(currentMonth))
  )
  const categories = useSelector(selectCategories)

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
      <button onClick={() => dispatch(carryoverMonth(currentMonth))}>
        Carryover from prev month
      </button>
      <div className="categories-grid">
        <div className="col-2 header">Group</div>
        <div className="col-2 header">Description</div>
        <div className="header">Bal Forward</div>
        <div className="header">Budgeted Amount</div>
        <div className="header">Additional Income</div>
        <div className="col-2 header">Spend</div>
        <div className="header">Available Balance</div>
        <div className="header">EOM Adjust</div>
        <div className="header">EOM Balance</div>
        <div className="header"></div>
        { ungroupedCategories.map((cat) => (
          <React.Fragment key={cat.id}>
            <div className="col-2">
              <GroupSelector
                groups={groups}
                onGroupSelect={(gid) => handleGroupSelect(gid, cat.id)}
              />
            </div>
            <CategoryRow
              category={cat}
            />
          </React.Fragment>
        ))}
        { groups.map((group) => {
          const groupCategories = categories.filter(c => group.categoryIds.includes(c.id))
          return (
            <div key={group.id} className="group">
              <div className="name">{group.name}</div>
              {groupCategories.map((cat) => (
                <div key={cat.id} className="group-category">
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
