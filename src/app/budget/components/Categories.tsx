import React, { useState } from 'react'

import { CategoryMonth } from '@budget/models/categoryMonth.model'
import currency from 'currency.js'
import { CategoryCreator } from './CategoryCreator'

type Props = {
  categories: CategoryMonth[]
  onCategoriesChanged: (categories: CategoryMonth[]) => void
}

export function Categories({ categories, onCategoriesChanged }: Props) {
  return (
    <>
      <CategoryCreator onCategoryCreate={() => {}}/>
      <table>
        <thead>
          <tr>
            <td scope='col'>Bal Forward</td>
            <td scope='col'>Budgeted Amount</td>
            <td scope='col'>Addl Income</td>
            <td scope='col'>Spend</td>
            <td scope='col'>Available Balance</td>
            <td scope='col'>EOM Adjust</td>
            <td scope='col'>EOM Balance</td>
          </tr>
        </thead>
        <tbody>
          { categories.map((cat) => (
            <tr key={cat.id}>
              <td>Bal Forward</td>
              <td>{cat.budgetedAmount}</td>
              <td>Addl Income</td>
              <td>{cat.transactions.reduce((prev, curr) => prev += currency(curr.amount).value , 0)}</td>
              <td>Available Balance</td>
              <td>EOM Adjust</td>
              <td>{cat.endOfMonthBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}