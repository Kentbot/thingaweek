import React from 'react'
import { Outlet } from 'react-router-dom'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import { Theme, styled } from '@mui/material/styles'
import Button, { ButtonProps } from '@mui/material/Button'

import Navigation from './Navigation'
import HeaderBar from './HeaderBar'

const navWidth = '15vw'

export default function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <HeaderBar />
      <Drawer
        variant="permanent"
        sx={{
          width: navWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: navWidth,
            boxSizing: 'border-box',
          },
        }}>
        <Box sx={{ paddingTop: 3}}>
          <Toolbar/>
          <Navigation />
        </Box>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3}}>
        <Toolbar/>
        <Outlet/>
      </Box>
    </Box>
  )
}