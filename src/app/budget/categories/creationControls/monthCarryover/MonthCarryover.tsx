import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { carryoverMonthThunk } from '@budget/store/thunks'
import { AppDispatch, RootState } from '@budget/store/store'

import './styles.scss'
import { Tooltip } from '@components/general/tooltip/Tooltip'

export function MonthCarryover() {
  const dispatch = useDispatch<AppDispatch>()
  const currentMonth = useSelector((state: RootState) => state.budgetMonth)

  return (
    <div className="carry-over">
      <button className="btn" onClick={() => dispatch(carryoverMonthThunk(currentMonth))}>
        Carry Over Categories
      </button>
      <Tooltip onClick={() => alert('TODO Month')} />
    </div>
  )
}