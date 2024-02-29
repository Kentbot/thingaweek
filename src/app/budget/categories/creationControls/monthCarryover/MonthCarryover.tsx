import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { carryoverMonthThunk } from '@budget/store/thunks'
import { AppDispatch, RootState } from '@budget/store/store'

import './styles.scss'

export function MonthCarryover() {
  const dispatch = useDispatch<AppDispatch>()
  const currentMonth = useSelector((state: RootState) => state.budgetMonth)

  return (
    <div className="carry-over">
      <button className="btn" onClick={() => dispatch(carryoverMonthThunk(currentMonth))}>
        Carry Over Categories
      </button>
      <span className="tooltip-btn" onClick={() => alert('TODO')}>?</span>
    </div>
  )
}