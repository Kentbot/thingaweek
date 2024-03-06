import { DateTime } from 'luxon'

import { WithBudgetMonth } from '@budget/models/types'

export function filterToBudgetMonth<T extends WithBudgetMonth>(modelWithBudgetMonth: T[], newMonth: DateTime): T[] {
  return modelWithBudgetMonth.filter((m: T) => 
    DateTime.fromISO(m.budgetMonth).month === newMonth.month &&
    DateTime.fromISO(m.budgetMonth).year === newMonth.year)
}