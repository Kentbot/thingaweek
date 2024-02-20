import React from 'react'

import './globals.scss'

export default function Home() {
  return (
    <>
      <h4>
        Welcome to my website!
      </h4>
      <div>
        This site is where I keep all my experiments with web technologies. I have plans for
        learning about things like:
      </div>
      <ul>
        <li>
          Next.js: This is the framework the site is built with
        </li>
        <li>
          Serverless functions (AWS Lambda, Google Cloud Functions, something like these)
        </li>
        <li>
          Any cool JS libraries that I find out about
        </li>
        <li>
          And more!
        </li>
      </ul>
    </>
  )
}
