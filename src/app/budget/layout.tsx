'use client'
import React from 'react'

import { Provider } from 'react-redux'

import store from './store/store'

import { BudgetNav } from './components/nav/BudgetNav'
import { DateSelector } from './dateSelector/DateSelector'

export default function BudgetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <BudgetNav />
      {children}
      <div className="date-selector">
        <DateSelector />
      </div>
    </Provider>
  )
}