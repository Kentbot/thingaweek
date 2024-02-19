import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState, defaultState } from '../store/store'
import { hydrateState, persistState } from '../store/thunks'

export default function Persister() {
  const dispatch = useDispatch<AppDispatch>()

  const state = useSelector((state: RootState) => state)
  const stateBlob = new Blob([JSON.stringify(state)], {
    type: "application/json",
  })
  const stateUrl = URL.createObjectURL(stateBlob)

  // TODO: Figure out way to revoke the object URL since it persists and is
  // technically a memory leak
  // URL.revokeObjectURL(stateUrl)
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const hydrationSource = await file.text()
      const hydrationRoot: RootState = JSON.parse(hydrationSource || JSON.stringify(defaultState))
      dispatch(hydrateState(hydrationRoot))
    }
  }

  const handleHydrationFromLocalStorage = () => {
    const hydrationSource = localStorage.getItem('state')
    const hydrationRoot: RootState = JSON.parse(hydrationSource || JSON.stringify(defaultState))
    dispatch(hydrateState(hydrationRoot))
  }

  return (
    <>
      <button onClick={() => dispatch(persistState())}>
        Persist it yo
      </button>
      <button onClick={() => handleHydrationFromLocalStorage()}>
        Load it yo
      </button>
      <a download="budget.json" href={stateUrl}>Download it</a>
      <input type='file' onChange={handleFileUpload} />
    </>
  )
}