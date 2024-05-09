import { describe, it, expect } from 'vitest'
import currency from 'currency.js'
import { ExpenseCategory } from '../models/expenseCategory.model'
import { calculateBalanceForward } from './category.service'
import { nanoid } from 'nanoid'

describe('calculateBalanceForward', () => {
  describe('no categories', () => {
    it('returns zero', () => {
      const result = calculateBalanceForward(createTestCategory(), [], [])
      expect(result).toStrictEqual(currency(0))
    })
  })

  describe('one prev month', () => {
    it('returns last months EOM balance', () => {
      const prevMonth = createTestCategory({ additionalIncome: '100', budgetedAmount: '251' })
      const testCat = createTestCategory({ linkedMonths: { prevId: prevMonth.id }})

      const result = calculateBalanceForward(testCat, [prevMonth], [])

      expect(result).toStrictEqual(currency(351))
    })
  })
})

function createTestCategory(options?: Partial<ExpenseCategory>): ExpenseCategory {
  const defaultId = nanoid()
  return {
    id: defaultId,
    additionalIncome: '0',
    budgetedAmount: '0',
    budgetMonth: '0',
    endOfMonthAdjust: '0',
    linkedMonths: {},
    name: `test ${defaultId}`,
    transactionIds: [],
    ...options
  }
}