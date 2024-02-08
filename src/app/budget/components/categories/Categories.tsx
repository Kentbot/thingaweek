import React, { useMemo } from 'react'

import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { CategoryGroup } from '@budget/models/categoryGroup.model'
import { Transaction } from '@budget/models/transaction.model'
import { CategoryCreator } from './CategoryCreator'
import { GroupSelector } from './GroupSelector'
import { CategoryRow } from './CategoryRow'

import './categories.styles.scss'

type Props = {
  categories: CategoryMonth[]
  groups: CategoryGroup[]
  transactions: Transaction[]
  onCategoryCreated: (category: CategoryMonth) => void
  onCategoryGroupCreated: (group: CategoryGroup) => void
  onCategoryMovedToGroup: (groupId: string, categoryId: string) => void
  onCategoryUpdated: (category: CategoryMonth) => void
  onMonthCarryover: () => void
}

export function Categories({
  categories,
  groups,
  transactions,
  onCategoryCreated,
  onCategoryGroupCreated,
  onCategoryMovedToGroup,
  onCategoryUpdated,
  onMonthCarryover
}: Props) {
  const ungroupedCategories = useMemo(
    () => {
      const catIdsInGroups = groups.flatMap(g => g.categoryIds)
      const ungroupedCats = categories.filter(cat => !catIdsInGroups.includes(cat.id))

      return ungroupedCats
    },
    [categories, groups])

  const handleGroupSelect = (groupId: string, categoryId: string) => {
    onCategoryMovedToGroup(groupId, categoryId)
  }

  const doCarryover = () => {
    onMonthCarryover()
  }

  return (
    <>
      <CategoryCreator
        onCategoryCreate={onCategoryCreated}
        onGroupCreate={onCategoryGroupCreated}
      />
      <button onClick={doCarryover}>Carryover from prev month</button>
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
              onCategoryUpdated={onCategoryUpdated}
              transactions={transactions}
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
                    onCategoryUpdated={onCategoryUpdated}
                    transactions={transactions}
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
