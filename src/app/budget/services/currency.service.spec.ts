import { describe, it, expect } from 'vitest'
import currency from 'currency.js'

import { formatCurrency, formatInputCurrency } from './currency.service'

describe('formatCurrency', () => {
  it.each([
    ['0.00', '0'],
    ['1.00', '1'],
    [currency('0.00'), '0'],
    [currency('1.00'), '1'],
  ])('removes cents from the end of currency (curr: %s, expected: %s)', (curr, expected) => {
    const result = formatCurrency(curr)
    expect(result).toBe(expected)
  })

  it.each([
    ['-1', '(1)'],
    [currency('-1'), '(1)']
  ])('formats negatives in parens (curr: %s, expected: %s)', (curr, expected) => {
    const result = formatCurrency(curr)
    expect(result).toBe(expected)
  })
})

describe('formatInputCurrency', () => {
  it('does not include separators', () => {
    const result = formatInputCurrency(currency(1000))
    expect(result).toBe('1000')
  })
})