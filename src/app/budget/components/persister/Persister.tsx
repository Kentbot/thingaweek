import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faFileArrowUp, faDownload, faUpload } from '@fortawesome/free-solid-svg-icons'

import { AppDispatch, RootState, defaultState } from '../../store/store'
import { hydrateState, persistState } from '../../store/thunks'

import './styles.scss'

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
    <div className="persister-buttons">
      <button onClick={() => dispatch(persistState())} className="btn">
        Browser Save&nbsp;&nbsp;<FontAwesomeIcon icon={faSave} size={'lg'} />
      </button>
      <button onClick={() => handleHydrationFromLocalStorage()} className="btn">
        Browser Load&nbsp;&nbsp;<FontAwesomeIcon icon={faFileArrowUp} size={'lg'} />
      </button>
      <a download="budget.json" href={stateUrl} className="btn download">
        Save Budget to File&nbsp;&nbsp;<FontAwesomeIcon icon={faDownload} />
      </a>
      <label htmlFor="state-upload" className="btn">
        Load Budget from File&nbsp;&nbsp;<FontAwesomeIcon icon={faUpload} />
      </label>
      <input id="state-upload" type="file" onChange={handleFileUpload} />
    </div>
  )
}