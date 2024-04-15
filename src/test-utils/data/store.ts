import { AppState, defaultState } from '@/budget/store/store'

const states = {
  default: {
    ...defaultState,
    budgetMonth: '2024-01-01',
  }
}

// We refer to the keys in states so that we always have a list of up to date
// states without having to manually update that list. This keeps intellisense
// working nicely with TS.
export const testStates: Record<keyof typeof states, AppState> = states