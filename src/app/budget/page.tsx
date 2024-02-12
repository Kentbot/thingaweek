'use client'

import React, { createContext } from 'react'

import { DateTime } from 'luxon'
import { Provider } from 'react-redux'

import store from './store/store'
import { Transactions } from './components/transactions/Transactions'
import { Categories } from './components/categories/Categories'
import { DateSelector } from './components/dateSelector/DateSelector'

import './styles.scss'

const defaultDate = DateTime.now()

export const BudgetMonthContext = createContext<DateTime>(defaultDate)

export default function Budget() {
  return (
    <Provider store={store}>
      <div className="budget">
        <div className="date-selector">
          <DateSelector />
        </div>
        <div className="categories">
          <Categories />
        </div>
        <div className="transactions">
          <Transactions />
        </div>
      </div>
    </Provider>
  )
}