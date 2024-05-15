'use client'
import React from 'react'

import { Provider } from 'react-redux'

import store from './store/store'

import { BudgetNav } from './components/nav/BudgetNav'
import { DateSelector } from './dateSelector/DateSelector'

import styles from './styles.module.css'

export default function BudgetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <BudgetNav />
      <div className={styles["page-contents"]}>
        {children}
        <div className="date-selector">
          <DateSelector />
        </div>
      </div>
    </Provider>
  )
}