import React from 'react'

import { DateTime } from 'luxon'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@budget/store/store'
import { changeMonth as changeBudgetMonth } from '@budget/store/slices/budgetMonth.slice'
import { createSelector } from '@reduxjs/toolkit'

const beginYear = 2024
const endYear = DateTime.now().year + 1
const yearSpan = endYear - beginYear + 1
const years = Array(yearSpan).fill(beginYear).map((val, index) => val + index)

import './styles.scss'

export function DateSelector() {
  const dispatch = useDispatch<AppDispatch>()
  const selectCurrentMonth = createSelector(
    (state: RootState) => state.budgetMonth,
    (budgetMonth) => DateTime.fromISO(budgetMonth))
  const currentMonth = useSelector(selectCurrentMonth)

  const handleMonthSelect = (newMonth: number) => {
    const newDateTime = DateTime.local(currentMonth.year, newMonth).toISODate()
    newDateTime && dispatch(changeBudgetMonth(newDateTime))
  }

  const handleYearSelect = (year: string) => {
    const newYear = Number(year)

    if (Number.isNaN(newYear)) throw new Error(`Could not set new year, value is not a number: ${year}`)
    
    const newDateTime = DateTime.local(newYear, currentMonth.month).toISODate()
    newDateTime && dispatch(changeBudgetMonth(newDateTime))
  }

  return (
    <>
      <div className="date-selection">
        <div className="month-select">
          <button className="month" onClick={() => handleMonthSelect(1)}>Jan</button>
          <button className="month" onClick={() => handleMonthSelect(2)}>Feb</button>
          <button className="month" onClick={() => handleMonthSelect(3)}>Mar</button>
          <button className="month" onClick={() => handleMonthSelect(4)}>Apr</button>
          <button className="month" onClick={() => handleMonthSelect(5)}>May</button>
          <button className="month" onClick={() => handleMonthSelect(6)}>Jun</button>
          <button className="month" onClick={() => handleMonthSelect(7)}>Jul</button>
          <button className="month" onClick={() => handleMonthSelect(8)}>Aug</button>
          <button className="month" onClick={() => handleMonthSelect(9)}>Sep</button>
          <button className="month" onClick={() => handleMonthSelect(10)}>Oct</button>
          <button className="month" onClick={() => handleMonthSelect(11)}>Nov</button>
          <button className="month" onClick={() => handleMonthSelect(12)}>Dec</button>
        </div>
        <select
          className="year-select"
          onChange={(event) => handleYearSelect(event.target.value)}
          defaultValue={DateTime.now().year.toString()}
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="current-budget-month">
        Currently Viewing: <span className="date">{currentMonth.monthLong} {currentMonth.year}</span>
      </div>
    </>
  )
}