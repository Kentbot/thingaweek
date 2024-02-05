import React, { useMemo } from 'react'

import currency from 'currency.js'

import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { CategoryGroup } from '@budget/models/categoryGroup.model'
import { CategoryCreator } from './CategoryCreator'
import { GroupSelector } from './GroupSelector'

import './categories.styles.scss'

type Props = {
  categories: CategoryMonth[]
  groups: CategoryGroup[]
  onCategoryCreated: (category: CategoryMonth) => void
  onCategoryGroupCreated: (group: CategoryGroup) => void
  onCategoryMovedToGroup: (groupId: string, category: CategoryMonth) => void
}

export function Categories({
  categories,
  groups,
  onCategoryCreated,
  onCategoryGroupCreated,
  onCategoryMovedToGroup
}: Props) {
  const ungroupedCategories = useMemo(
    () => {
      const catIdsInGroups = groups.flatMap(g => g.categories.map(c => c.id))
      const ungroupedCats = categories.filter(cat => !catIdsInGroups.includes(cat.id))

      return ungroupedCats
    },
    [categories, groups])

  const handleGroupSelect = (groupId: string, category: CategoryMonth) => {
    onCategoryMovedToGroup(groupId, category)
  }

  return (
    <>
      <CategoryCreator
        onCategoryCreate={onCategoryCreated}
        onGroupCreate={onCategoryGroupCreated}
      />
      <div className="categories-grid">
        <div className="col-2">Group</div>
        <div className="col-2">Description</div>
        <div>Bal Forward</div>
        <div>Budgeted Amount</div>
        <div>Addl Income</div>
        <div className="col-2">Spend</div>
        <div>Available Balance</div>
        <div>EOM Adjust</div>
        <div>EOM Balance</div>
        { ungroupedCategories.map((cat) => (
          <React.Fragment key={cat.id}>
            <div className="col-2">
              <GroupSelector
                groups={groups}
                onGroupSelect={(gid) => handleGroupSelect(gid, cat)}
              />
            </div>
            <div className="col-2">{cat.name}</div>
            <div>-Bal Forward-</div>
            <div>{cat.budgetedAmount}</div>
            <div>-Addl Income-</div>
            <div className="col-2">{cat.transactions.reduce((prev, curr) => currency(curr.amount).add(prev) , currency(0)).value}</div>
            <div>-Available Balance-</div>
            <div>-EOM Adjust-</div>
            <div>{cat.endOfMonthBalance}</div>
          </React.Fragment>
        ))}
        { groups.map((group) => (
          <div key={group.id} className="group">
            <div className="name">{group.name}</div>
            {group.categories.map((cat) => (
              <div key={cat.id} className="group-category">
                <div className="col-2">{cat.name}</div>
                <div>-Bal Forward-</div>
                <div>{cat.budgetedAmount}</div>
                <div>-Addl Income-</div>
                <div className="col-2">{cat.transactions.reduce((prev, curr) => currency(curr.amount).add(prev) , currency(0)).value}</div>
                <div>-Available Balance-</div>
                <div>-EOM Adjust-</div>
                <div>{cat.endOfMonthBalance}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}