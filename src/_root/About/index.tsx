import React from 'react'

import { Typography } from '@mui/material'

export default function About() {
  return (
    <>
      <Typography variant="h4">
        About the site
      </Typography>
      <Typography variant="body1" sx={{ pt: 3 }}>
        My goal is to release one new "thing" every week. For this first week the "thing"
        is the website itself. I plan on having a responsive design, basic layout with navigation,
        and light/dark theme togglable. I will use Material UI (MUI) and create-react-app, though
        in the future I may use other frameworks or libraries like Next.js/Nuxt.js, Vue, Svelte,
        Angular, etc.
        <br/>
        <br/>
        As I come up with more ideas and organize them, I'll populate a list here (or somewhere else on the site, we'll see!)
      </Typography>
    </>
  )
}