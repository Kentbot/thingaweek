'use client'
import React from 'react'

import dynamic from 'next/dynamic'

// This has to be done because the blob for downloading the state JSON file differs
// on the server and client (breaking SSR). This defers the component to render only
// after the client has recieved the SSR markup from the server.
const Persister = dynamic(() => import('./components/persister/Persister'), {
  ssr: false,
  loading: () => <>Loading persistence buttons...<button disabled className="btn" style={{opacity: 0}}>load</button></>,
});

import './styles.scss'

export default function Budget() {
  return (
    <div className="budget">
      <div className="persister">
        <Persister />
      </div>
    </div>
  )
}