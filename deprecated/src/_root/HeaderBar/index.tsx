import React from 'react'

import AppBar from '@mui/material/AppBar'
import { Toolbar, Typography, IconButton, useTheme } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { ColorModeContext } from '_root/Themed'

export default function HeaderBar() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography sx={{ flexGrow: 1}} variant="h6" noWrap component={"div"}>
          Kent's Code and Such
        </Typography>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness4Icon/> : <Brightness7Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}