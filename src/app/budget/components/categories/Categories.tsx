import React from 'react'

import { CategoryMonth } from '@budget/models/categoryMonth.model'
import currency from 'currency.js'
import { CategoryCreator } from './CategoryCreator'

import './styles.scss'
import { CategoryGroup } from '@budget/models/categoryGroup.model'

type Props = {
  categories: CategoryMonth[]
  onCategoryCreated: (category: CategoryMonth) => void
  onCategoryGroupCreated: (group: CategoryGroup) => void
}

export function Categories({ categories, onCategoryCreated, onCategoryGroupCreated }: Props) {
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
        <div className="group">
          <div className="name">test Group</div>
          <div className="group-category">
            <div className="col-2">test Description</div>
            <div>test Bal Forward</div>
            <div>test Budgeted Amount</div>
            <div>test Addl Income</div>
            <div className="col-2">test Spend</div>
            <div>test Available Balance</div>
            <div>test EOM Adjust</div>
            <div>test EOM Balance</div>

            <div className="col-2">test Description</div>
            <div>test Bal Forward</div>
            <div>test Budgeted Amount</div>
            <div>test Addl Income</div>
            <div className="col-2">test Spend</div>
            <div>test Available Balance</div>
            <div>test EOM Adjust</div>
            <div>test EOM Balance</div>
          </div>
        </div><div className="group">
          <div className="name">test Group</div>
          <div className="group-category">
            <div className="col-2">test Description</div>
            <div>test Bal Forward</div>
            <div>test Budgeted Amount</div>
            <div>test Addl Income</div>
            <div className="col-2">test Spend</div>
            <div>test Available Balance</div>
            <div>test EOM Adjust</div>
            <div>test EOM Balance</div>

            <div className="col-2">test Description</div>
            <div>test Bal Forward</div>
            <div>test Budgeted Amount</div>
            <div>test Addl Income</div>
            <div className="col-2">test Spend</div>
            <div>test Available Balance</div>
            <div>test EOM Adjust</div>
            <div>test EOM Balance</div>

            <div className="col-2">test Description</div>
            <div>test Bal Forward</div>
            <div>test Budgeted Amount</div>
            <div>test Addl Income</div>
            <div className="col-2">test Spend</div>
            <div>test Available Balance</div>
            <div>test EOM Adjust</div>
            <div>test EOM Balance</div>

            <div className="col-2">test Description</div>
            <div>test Bal Forward</div>
            <div>test Budgeted Amount</div>
            <div>test Addl Income</div>
            <div className="col-2">test Spend</div>
            <div>test Available Balance</div>
            <div>test EOM Adjust</div>
            <div>test EOM Balance</div>

            <div className="col-2">test Description</div>
            <div>test Bal Forward</div>
            <div>test Budgeted Amount</div>
            <div>test Addl Income</div>
            <div className="col-2">test Spend</div>
            <div>test Available Balance</div>
            <div>test EOM Adjust</div>
            <div>test EOM Balance</div>
          </div>
        </div>
        { categories.map((cat) => (
          <React.Fragment key={cat.id}>
            <div className="c3">{cat.name}</div>
            <div className="c2">-Bal Forward-</div>
            <div className="c1">{cat.budgetedAmount}</div>
            <div className="c4">-Addl Income-</div>
            <div className="c5">{cat.transactions.reduce((prev, curr) => currency(curr.amount).add(prev) , currency(0)).value}</div>
            <div className="c6">-Available Balance-</div>
            <div className="c7">-EOM Adjust-</div>
            <div className="c8">{cat.endOfMonthBalance}</div>
          </React.Fragment>
        ))}
      </div>
    </>
  )
}