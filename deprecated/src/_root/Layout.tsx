import React from 'react'
import { Outlet } from 'react-router-dom'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'

import Navigation from './Navigation'

import AppBar from '@mui/material/AppBar'
import { Toolbar, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';

import { ColorModeContext } from '_root/Themed'

const mobileNavWidth = '240px'
const desktopNavWidth = '20vw'

export default function Layout() {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  };

  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'))

  const drawerWidth = isMobile ? mobileNavWidth : desktopNavWidth
  
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography sx={{ flexGrow: 1}} variant="h6" noWrap component={"div"}>
            Kent's Code and Such
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness4Icon/> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={ isMobile ? "temporary" : "permanent" }
        open={ isMobile ? mobileOpen : true }
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
            <Navigation/>
          </Box>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3}}>
        <Toolbar/>
        <Outlet/>
      </Box>
    </Box>
  )
}
