import React, { ReactElement } from 'react'
import { Provider } from 'react-redux'

import {render, RenderOptions} from '@testing-library/react'

import { customStore, defaultState, RootState } from '@/budget/store/store'

const AllTheProviders = (state: RootState) => {
  const provider = ({children}: {children: React.ReactNode}) => {
    return (
      <Provider store={customStore(state)}>
        {children}
      </Provider>
    )
  }

  return provider
}

const customRender = (
  ui: ReactElement,
  state: RootState = defaultState,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders(state), ...options})

export * from '@testing-library/react'
export {customRender as render}