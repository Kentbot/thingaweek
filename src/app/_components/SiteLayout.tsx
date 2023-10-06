'use client'

import { useState } from 'react'

import useTheme from '@mui/material/styles/useTheme'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar/Toolbar'
import Drawer from '@mui/material/Drawer/Drawer'

import Navigation from '@/app/_components/Navigation'
import HeaderBar from './HeaderBar'
import useCheckMobileScreen from '@/utils/screenSize'
import AppBar from '@mui/material/AppBar'

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

  const isMobile = useCheckMobileScreen();

  const drawerWidth = isMobile ? mobileNavWidth : desktopNavWidth

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <HeaderBar />
      </AppBar>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
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