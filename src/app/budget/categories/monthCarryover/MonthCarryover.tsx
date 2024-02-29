import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { carryoverMonthThunk } from '@budget/store/thunks'
import { AppDispatch, RootState } from '@budget/store/store'

export function MonthCarryover() {
  const dispatch = useDispatch<AppDispatch>()
  const currentMonth = useSelector((state: RootState) => state.budgetMonth)

  return (
    <button className="btn gap-left" onClick={() => dispatch(carryoverMonthThunk(currentMonth))}>
      Carry Over Categories
    </button>
  )
}