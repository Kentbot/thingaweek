import { describe, it } from 'vitest'
import { render } from 'test-utils/budget'
import { testStates } from 'test-utils/data/store'
import { IncomeView } from './IncomeView'

describe('Income View', () => {
  describe('todo', () => {
    it('todo', () => {
      render(<IncomeView />, testStates.default)

      // TODO: Add test
      // screen.
    })

  })
})