import currency from 'currency.js'

import { formatCurrency } from './currency.service'

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