'use client'

import { useState } from 'react'

import useTheme from '@mui/material/styles/useTheme'
import useMediaQuery from '@mui/material/useMediaQuery/useMediaQuery'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar/Toolbar'
import AppBar from '@mui/material/AppBar/AppBar'
import Drawer from '@mui/material/Drawer/Drawer'

import Navigation from '@/app/_components/Navigation'
import HeaderBar from './HeaderBar'

const mobileNavWidth = '240px'
const desktopNavWidth = '20vw'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  };

  const theme = useTheme()

  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  const drawerWidth = isDesktop ? desktopNavWidth : mobileNavWidth

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <HeaderBar />
      </AppBar>
      <Drawer
        variant={ isDesktop ? "permanent" : "temporary" }
        open={ isDesktop ? true : mobileOpen }
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: drawerWidth,
          display: 'block',
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Box sx={{ flexGrow: 1, pt: 3}}>
          <Toolbar/>
          <Navigation />
        </Box>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3}}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}