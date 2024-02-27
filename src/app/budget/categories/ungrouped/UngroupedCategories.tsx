import React from 'react'

import { useDispatch } from 'react-redux'

import { useBudgetMonthGroups, useUngroupedCategories } from '@budget/store/selectors'
import { assignCategoryToGroup } from '@budget/store/slices/group.slice'

import { GroupSelector } from '../GroupSelector'
import { CategoryRow } from '../CategoryRow'

import styles from './styles.module.scss'

export function UngroupedCategories() {
  const dispatch = useDispatch()

  const categories = useUngroupedCategories()
  const groups = useBudgetMonthGroups()

  const handleGroupSelect = (groupId: string, categoryId: string) => {
    dispatch(assignCategoryToGroup({ groupId, categoryId }))
  }

  return (
    <div className={styles.ungroupedCategories}>
      {categories.map((category, index) => (
        <div className={"category-row" + (index % 2 === 1 ? " highlight" : "")} key={category.id}>
          <div className="col-2 group-select">
            <GroupSelector
              groups={groups}
              onGroupSelect={(gid) => handleGroupSelect(gid, category.id)}
            />
          </div>
          <CategoryRow category={category} />
        </div>
      ))}
    </div>
  )
}