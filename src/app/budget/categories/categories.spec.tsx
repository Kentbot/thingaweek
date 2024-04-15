import { render } from 'test-utils/budget'
import { testStates } from 'test-utils/data/store'
import CategoriesPage from './page'

describe('Budget Category Page', () => {
  it('renders', () => {
    render(<CategoriesPage />)
  })

  describe('category carryover', () => {
    describe('income categories', () => {
      it('carries over from month to month', async () => {
        const { user, findByRole, findByPlaceholderText } = render(<CategoriesPage />, testStates.default)

        await user.click(await findByRole('button', { name: /category management/i }))

        await user.click(await findByPlaceholderText(/income category name/i))

        await user.keyboard('test income')

        await user.click(await findByRole('button', { name: /create income/i }))

        await user.keyboard('[Escape]')
      })
    })
  })
})