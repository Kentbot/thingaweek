import { describe, it, expect } from 'vitest'
import { render } from 'test-utils/budget'
import { testStates } from 'test-utils/data/store'
import CategoriesPage from './page'

describe('Budget Category Page', () => {
  it('renders', () => {
    const { unmount } = render(<CategoriesPage />)
    // Prevents component from leaking between tests
    unmount()
  })

  describe('category carryover', () => {
    describe('income categories', () => {
      it('is created correctly', async () => {
        const {
          user,
          findByRole,
          findByPlaceholderText,
          findByText,
          findAllByText,
          unmount
        } = render(<CategoriesPage />, testStates.default)

        await user.click(await findByRole('button', { name: /category management/i }))

        await user.click(await findByPlaceholderText(/income category name/i))

        await user.keyboard('test income')
        await user.tab()
        await user.keyboard('150.15')

        await user.click(await findByRole('button', { name: /create income/i }))

        await user.keyboard('[Escape]')

        const incomeTitle = await findByText('test income')
        expect(incomeTitle.parentElement?.className).toBe('income-grid')
        const expectedIncome = await findAllByText('150.15')
        expect(expectedIncome.some(el => el.parentElement?.className === 'income-grid')).toBeTruthy()
        unmount()
      })
    })
  })
})