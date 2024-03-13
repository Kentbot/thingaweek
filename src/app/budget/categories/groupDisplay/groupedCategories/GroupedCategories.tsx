import React from 'react'

import { useDispatch } from 'react-redux'
import currency from 'currency.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import { useBudgetMonthCategories, useBudgetMonthGroups, useCategoryTransactions } from '@budget/store/selectors'
import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { AppDispatch } from '@budget/store/store'

import './styles.scss'

export function GroupedCategories() {
  const groups = useBudgetMonthGroups()
  const categories = useBudgetMonthCategories()

  const hidden = groups.length === 0

  return (
    <div className="grouped-categories-grid">
      <div className={`header-row ${hidden ? 'hidden' : ''}`}>
        <div className="header group-header"></div>
        <div className="header category">Category</div>
        <div className="header">Balance Forward</div>
        <div className="header">Budgeted Amount</div>
        <div className="header">Additional Income</div>
        <div className="header">Spend</div>
        <div className="header">Available Balance</div>
        <div className="header">EOM Adjust</div>
        <div className="header">EOM Balance</div>
        <div>{/* Edit button */}</div>
      </div>
      { groups.map((group) => {
        const groupCategories = categories.filter(c => group.categoryIds.includes(c.id))
        return (
          <React.Fragment key={group.id}>
            <div className="group">
              <div className="name">{group.name}</div>
              <div className="group-categories">
                {groupCategories.map((category, index) => (
                  <React.Fragment key={category.id}>
                    <CategoryRow category={category} highlight={index % 2 === 1} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

function CategoryRow({ category, highlight }: { category: CategoryMonth, highlight?: boolean }) {
  const dispatch = useDispatch<AppDispatch>()
  const categoryTransactions = useCategoryTransactions(category.transactionIds)

 const spend = categoryTransactions.reduce(
    (prev, curr) => currency(curr.amount).add(prev), currency(0)
  ) 
  const balance = currency(category.budgetedAmount).subtract(spend)

  return (
    <div key={category.id} className={`group-category ${(highlight ? " highlight" : "")}`}>
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