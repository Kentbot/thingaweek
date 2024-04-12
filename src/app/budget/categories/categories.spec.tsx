import { render, screen } from 'test-utils/budget'
import { testStates } from 'test-utils/data/store'
import CategoriesPage from './page'

describe('Budget Category Page', () => {
  it('renders', () => {
    render(<CategoriesPage />)
  })
})