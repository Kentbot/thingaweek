import React from 'react'

import { useDispatch } from 'react-redux'

import { AppDispatch } from './store/store'
import { hydrateState, persistState } from './store/thunks'

export function Persister() {
  const dispatch = useDispatch<AppDispatch>()
  
  return (
    <>
      <button onClick={() => dispatch(persistState())}>
        Persist it yo
      </button>
      <button onClick={() => dispatch(hydrateState())}>
        Load it yo
      </button>
    </>
  )
}