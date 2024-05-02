import React from 'react'

import { DateTime } from 'luxon'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

import { AppDispatch, RootState } from '@/budget/store/store'
import { changeMonth as changeBudgetMonth } from '@/budget/store/slices/budgetMonth.slice'

const beginYear = 2023
const endYear = DateTime.now().year + 1
const yearSpan = endYear - beginYear + 1
const years = Array(yearSpan).fill(beginYear).map((val, index) => val + index)

import styles from './styles.module.css'

export function DateSelector() {
  const dispatch = useDispatch<AppDispatch>()
  const selectCurrentMonth = createSelector(
    (state: RootState) => state.budgetMonth,
    (budgetMonth) => DateTime.fromISO(budgetMonth))
  const currentMonth = useSelector(selectCurrentMonth)
  const currentMonthNumber = currentMonth.month

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
      <div className={styles["date-selection"]}>
        <div className={styles["month-select"]}>
          <button className={`${styles["month"]} btn ${(currentMonthNumber === 1 ? styles["selected"] : "")}`} onClick={() => handleMonthSelect(1)}>Jan</button>
          <button className={`${styles["month"]} btn ${(currentMonthNumber === 2 ? styles["selected"] : "")}`} onClick={() => handleMonthSelect(2)}>Feb</button>
          <button className={`${styles["month"]} btn ${(currentMonthNumber === 3 ? styles["selected"] : "")}`} onClick={() => handleMonthSelect(3)}>Mar</button>
          <button className={`${styles["month"]} btn ${(currentMonthNumber === 4 ? styles["selected"] : "")}`} onClick={() => handleMonthSelect(4)}>Apr</button>
          <button className={`${styles["month"]} btn ${(currentMonthNumber === 5 ? styles["selected"] : "")}`} onClick={() => handleMonthSelect(5)}>May</button>
          <button className={`${styles["month"]} btn ${(currentMonthNumber === 6 ? styles["selected"] : "")}`} onClick={() => handleMonthSelect(6)}>Jun</button>
          <button className={`${styles["month"]} btn ${(currentMonthNumber === 7 ? styles["selected"] : "")}`} onClick={() => handleMonthSelect(7)}>Jul</button>
          <button className={`${styles["month"]} btn ${(currentMonthNumber === 8 ? styles["selected"] : "")}`} onClick={() => handleMonthSelect(8)}>Aug</button>
          <button className={`${styles["month"]} btn ${(currentMonthNumber === 9 ? styles["selected"] : "")}`} onClick={() => handleMonthSelect(9)}>Sep</button>
          <button className={`${styles["month"]} btn ${(currentMonthNumber === 10 ? styles["selected"] : "")}`} onClick={() => handleMonthSelect(10)}>Oct</button>
          <button className={`${styles["month"]} btn ${(currentMonthNumber === 11 ? styles["selected"] : "")}`} onClick={() => handleMonthSelect(11)}>Nov</button>
          <button className={`${styles["month"]} btn ${(currentMonthNumber === 12 ? styles["selected"] : "")}`} onClick={() => handleMonthSelect(12)}>Dec</button>
        </div>
        <div className={styles["year"]}>
          <select
            className={`${styles["year-select"]} btn`}
            onChange={(event) => handleYearSelect(event.target.value)}
            defaultValue={DateTime.now().year.toString()}
          >
            {years.map((year) => (
              <option key={year} value={year} className={`${styles["year-select-option"]}`}>{year}</option>
            ))}
          </select>
        </div>
        <div className={styles["current-budget-month"]}>
          Currently Viewing: <br/> <span className="date">{currentMonth.monthLong} {currentMonth.year}</span>
        </div>
      </div>
    </>
  )
}