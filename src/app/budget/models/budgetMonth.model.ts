import { DateTime } from 'luxon'

import { CategoryGroup } from './categoryGroup.model'
import { CategoryMonth } from './categoryMonth.model'
import { Transaction } from './transaction.model'

/* Notes:
 * Budget Month:
 *   - only the two most recent months are to remain unlocked
 *   - can be 'carried forward' with all groups/categories:
 *      * doing this will overwrite any previous setup for the month
 * Categories:
 *   - are assigned any number of transactions
 *   - can link back to the previous month
 *   - are one-to-one
 *   - propagate forward when updated
 *   - can be 're-targeted' to a different previous month category
 * Transactions:
 *   - are assigned to one category
 *   - can be 'split', maintaining the original total, with the split pieces
 *     being able to be assigned to different categories
 */
export interface BudgetMonth {
  id: string
  month: DateTime
  active: boolean
  categories: CategoryMonth[]
  groups: CategoryGroup[]
  transactions: Transaction[]
}