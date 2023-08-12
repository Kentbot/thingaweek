import React from 'react'

import Stack from '@mui/material/Stack'

import './navigation.scss'
import { NavLinkButton } from '@/components/buttons/NavLinkButton'

export default function Navigation() {
  return (
    <Stack direction={"column"} spacing={2} sx={{ sm: { mx: 4 }, px: 2 }}>
      {/* <NavLinkButton variant="text" LinkComponent={Link} to="/">
        Home
      </NavLinkButton>
      <NavLinkButton variant="text" LinkComponent={Link} to="/about">
        About
      </NavLinkButton> */}
      <NavLinkButton href="/">
        Home
      </NavLinkButton>
      <NavLinkButton href="/about">
        About
      </NavLinkButton>
    </Stack>
  )
}
