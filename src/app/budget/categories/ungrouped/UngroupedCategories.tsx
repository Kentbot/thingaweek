import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useBudgetMonthGroups, useUngroupedCategories } from '@budget/store/selectors'
import { assignCategoryToGroup } from '@budget/store/slices/group.slice'

import { GroupSelector } from '../GroupSelector'
import { CategoryRow } from '../CategoryRow'

export function UngroupedCategories() {
  const dispatch = useDispatch()

  const categories = useUngroupedCategories()
  const groups = useBudgetMonthGroups()

  const handleGroupSelect = (groupId: string, categoryId: string) => {
    dispatch(assignCategoryToGroup({ groupId, categoryId }))
  }

  return (
    <div className="ungrouped">
      {categories.map((cat, index) => (
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
    </div>
  )
}