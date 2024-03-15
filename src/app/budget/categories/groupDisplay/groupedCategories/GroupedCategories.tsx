import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import currency from 'currency.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import { useBudgetMonthCategories, useBudgetMonthGroups, useCategoryTransactions } from '@budget/store/selectors'
import { CategoryMonth } from '@budget/models/categoryMonth.model'
import { AppDispatch, RootState } from '@budget/store/store'

import './styles.scss'
import { calculateBalanceForward } from '@budget/services/category.service'

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
  const allCategories = useSelector((state: RootState) => state.categories)
  const allTransactions = useSelector((state: RootState) => state.transactions)

  const spend = categoryTransactions.reduce(
    (prev, curr) => currency(curr.amount).add(prev), currency(0)
  ) 
  const balance = currency(category.budgetedAmount).subtract(spend)

  const balanceForward = calculateBalanceForward(category, allCategories, allTransactions)
  const endOfMonthBalance = currency(balanceForward)
    .add(category.budgetedAmount)
    .add(category.additionalIncome)
    .subtract(spend)
    .add(category.endOfMonthAdjust)
    .toString()

  return (
    <div key={category.id} className={`group-category ${(highlight ? " highlight" : "")}`}>
      <div className="category-name">
        {category.name}
      </div>
      <div>
        {balanceForward}
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
        {endOfMonthBalance}
      </div>
      <button className="btn category-edit-button">
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
    </div>
  )
}