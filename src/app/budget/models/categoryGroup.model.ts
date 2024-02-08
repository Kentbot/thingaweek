import { DateTime } from 'luxon'

import { CategoryMonth } from './categoryMonth.model'

export interface CategoryGroup {
  id: string
  name: string
  categoryIds: string[]
  budgetMonth: DateTime
}