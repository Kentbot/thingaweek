'use client'

import React from 'react'

import { Provider, useDispatch } from 'react-redux'

import store from './store/store'
import { Transactions } from './components/transactions/Transactions'
import { Categories } from './components/categories/Categories'
import { DateSelector } from './components/dateSelector/DateSelector'
import { Persister } from './Persister'

import './styles.scss'

export default function Budget() {
  return (
    <Provider store={store}>
      <div className="budget">
        <div className="date-selector">
          <DateSelector />
        </div>
        <div className="persister">
          <Persister />
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