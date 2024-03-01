import { WithBudgetMonth } from './types'

/* Notes:
 * Budget Month:
 *   - only the two most recent months are to remain unlocked
 *   - can be 'carried forward' with all groups/categories:
 *      * doing this should be idempotent for groups, categories, income. Transactions unaffected
 * Categories:
 *   - are assigned any number of transactions
 *   - can link back to the previous month
 *   - are zero-or-one-to-one when linked
 *   - propagate forward when updated
 *   - can be 're-targeted' to a different previous month category or 'un-linked'
 *     * recalculation needs to be done for the one being retargeted or unlinked
 * Transactions:
 *   - are assigned to one category
 *   - can be 'split', maintaining the original total, with the split pieces
 *     being able to be assigned to different categories
 */
export interface CategoryGroup extends WithBudgetMonth {
  id: string
  name: string
  categoryIds: string[]
}