import React from 'react'
import { Link } from 'react-router-dom'

import Stack from '@mui/material/Stack'

import './navigation.scss'

import { NavLinkButton } from '_components/buttons/NavLinkButton'

export default function Navigation() {
  return (
    <Stack direction={"column"} spacing={2} sx={{ mx: 4 }}>
      <NavLinkButton variant="text" LinkComponent={Link} to="/">
        Home
      </NavLinkButton>
      <NavLinkButton variant="text" LinkComponent={Link} to="/about">
        About
      </NavLinkButton>
    </Stack>
  )
}
