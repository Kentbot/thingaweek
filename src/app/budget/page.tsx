'use client'
import React from 'react'

import dynamic from "next/dynamic";

import { Provider } from 'react-redux'

import store from './store/store'
import { Transactions } from './components/transactions/Transactions'
import { Categories } from './components/categories/Categories'
import { DateSelector } from './components/dateSelector/DateSelector'

// This has to be done because the blob for downloading the state JSON file differs
// on the server and client (breaking SSR). This defers the component to render only
// after the client has recieved the SSR markup from the server.
const Persister = dynamic(() => import('./components/Persister'), { ssr: false });

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