'use client'

import React from 'react'

import { useMediaQuery, createTheme, ThemeProvider, CssBaseline } from '@mui/material'

import { darkThemeOptions, lightThemeOptions } from './themes'

export const ColorModeContext = React.createContext({ toggleColorMode: () => { console.warn('default') } })

/**
 * This component acts as the theme provider and the theme Context provider.
 * The theme provider is MUI's theme provider that allows components to use common
 * styling. The theme Context provider provides a way to switch between dark and light
 * modes.
 * 
 * @param props The child nodes, any normal React JSX stuff can go here
 */
export default function Themed(props: React.PropsWithChildren) {
  // Pretty much all of this is shamelessly lifted from the MUI docs
  // https://mui.com/material-ui/customization/dark-mode
  const defaultTheme = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  
  const [mode, setMode] = React.useState<'light' | 'dark'>(defaultTheme)
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = React.useMemo(
    () => mode === 'dark' ?
      createTheme(darkThemeOptions) :
      createTheme(lightThemeOptions),
    [mode],
  )
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}