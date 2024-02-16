import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../store/store'
import { hydrateState, persistState } from '../store/thunks'

export default function Persister() {
  const dispatch = useDispatch<AppDispatch>()

  const state = useSelector((state: RootState) => state)
  const stateBlob = new Blob([JSON.stringify(state)], {
    type: "application/json",
  })
  const stateUrl = URL.createObjectURL(stateBlob)
  // URL.revokeObjectURL(stateUrl)
  
  return (
    <>
      <button onClick={() => dispatch(persistState())}>
        Persist it yo
      </button>
      <button onClick={() => dispatch(hydrateState())}>
        Load it yo
      </button>
      <a download="budget.json" href={stateUrl}>Download it</a>
    </>
  )
}