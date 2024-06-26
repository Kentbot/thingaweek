import React from 'react'

import { useDispatch } from 'react-redux'
import currency from 'currency.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import { useBudgetMonthGroups, useCategoryTransactions, useUngroupedCategories } from '@/budget/store/selectors'
import { assignCategoryToGroup } from '@/budget/store/slices/group.slice'
import { AppDispatch } from '@/budget/store/store'

import { ExpenseCategory } from '@/budget/models/expenseCategory.model'

import { Dropdown } from '@/components/general/dropdown/Dropdown'

import './styles.scss'

export function UngroupedCategories() {
  const categories = useUngroupedCategories()

  const hidden = categories.length === 0

  return (
    <div className={`ungrouped-categories ${hidden ? 'hidden' : ''}`}>
      <HeaderRow />
      {categories.map((category, index) => (
        <React.Fragment key={category.id}>
          <CategoryRow
            category={category}
            highlight={index % 2 === 1}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

function HeaderRow() {
  return (
    <div className="header">
      <div className="label">Ungrouped Categories</div>
      <div>{/* Group Selector */}</div>
      <div className="category">Category</div>
      <div>Balance Forward</div>
      <div>Budgeted Amount</div>
      <div>Additional Income</div>
      <div>Spend</div>
      <div>Available Balance</div>
      <div>EOM Adjust</div>
      <div>EOM Balance</div>
      <div>{/* Context menu button */}</div>
    </div>
  )
}

function CategoryRow({ category, highlight }: { category: ExpenseCategory, highlight?: boolean }) {
  const dispatch = useDispatch<AppDispatch>()
  const categoryTransactions = useCategoryTransactions(category.transactionIds)
  const groups = useBudgetMonthGroups()

 const spend = categoryTransactions.reduce(
    (prev, curr) => currency(curr.amount).add(prev), currency(0)
  ) 
  const balance = currency(category.budgetedAmount).subtract(spend)

  const handleGroupSelect = (groupId: string | undefined, categoryId: string) => {
    if (groupId) {
      dispatch(assignCategoryToGroup({ groupId, categoryId }))
    }
  }

  return (
    <div className={`category-row ${highlight ? 'highlight' : ''}`}>
      <div className="group-select">
        <Dropdown
          onSelect={(value) => handleGroupSelect(value.value, category.id)}
          options={groups.map(g => ({ value: g.id, display: g.name }))}
        />
      </div>
      <div className="category-name">
        {category.name}
      </div>
      <div>
        bal fwd
      </div>
      <div>
        {category.budgetedAmount}
      </div>
      <div>
        {category.additionalIncome}
      </div>
      <div>
        {spend.toString()}
      </div>
      <div>
        {balance.toString()}
      </div>
      <div>
        {category.endOfMonthAdjust}
      </div>
      <div>
        eom bal
      </div>
      <button className="btn category-edit-button">
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
    </div>
  )
}