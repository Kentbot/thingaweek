import { BudgetMonthContext } from '@budget/oldpage'
import { DateTime } from 'luxon'
import React, { useContext } from 'react'

type Props = {
  onMonthChange: (month: number) => void
  onYearChange: (year: number) => void
}

const beginYear = 2024
const endYear = DateTime.now().year + 1
const yearSpan = endYear - beginYear + 1
const years = Array(yearSpan).fill(beginYear).map((val, index) => val + index)

export function DateSelector({ onMonthChange, onYearChange }: Props) {
  const currentBudgetMonth = useContext(BudgetMonthContext)

  const handleMonthSelect = (month: number) => {
    onMonthChange(month)
  }

  const handleYearSelect = (year: string) => {
    const newYear = Number(year)

    if (Number.isNaN(newYear)) throw new Error(`Could not set new year, value is not a number: ${year}`)
    
    onYearChange(newYear)
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
        {currentBudgetMonth.monthLong} {currentBudgetMonth.year}
      </div>
    </>
  )
}