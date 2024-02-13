import React from 'react'

import { DateTime } from 'luxon'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@budget/store/store'
import { changeMonth as changeBudgetMonth } from '@budget/store/budgetMonth.slice'
import { ISODateString } from '@budget/store/types'
import { createSelector } from '@reduxjs/toolkit'

type Props = {}

const beginYear = 2024
const endYear = DateTime.now().year + 1
const yearSpan = endYear - beginYear + 1
const years = Array(yearSpan).fill(beginYear).map((val, index) => val + index)

export function DateSelector({}: Props) {
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
      <div className="month-select">
        <button onClick={() => handleMonthSelect(1)}>Jan</button>
        <button onClick={() => handleMonthSelect(2)}>Feb</button>
        <button onClick={() => handleMonthSelect(3)}>Mar</button>
        <button onClick={() => handleMonthSelect(4)}>Apr</button>
        <button onClick={() => handleMonthSelect(5)}>May</button>
        <button onClick={() => handleMonthSelect(6)}>Jun</button>
        <button onClick={() => handleMonthSelect(7)}>Jul</button>
        <button onClick={() => handleMonthSelect(8)}>Aug</button>
        <button onClick={() => handleMonthSelect(9)}>Sep</button>
        <button onClick={() => handleMonthSelect(10)}>Oct</button>
        <button onClick={() => handleMonthSelect(11)}>Nov</button>
        <button onClick={() => handleMonthSelect(12)}>Dec</button>
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
      <div className="current-budget-month">
        {currentMonth.monthLong} {currentMonth.year}
      </div>
    </>
  )
}