import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom'

import './app.scss'

import Layout from '_root/Layout'
import SiteOverview from '_root/SiteOverview'
import About from '_root/About'
import Themed from '_root/Themed'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<SiteOverview />} />
      <Route path="about" element={<About />} />
    </Route>
  )
)

function App() {
  return (
    <Themed>
      <RouterProvider router={router} />
    </Themed>
  )
}

export default App;
