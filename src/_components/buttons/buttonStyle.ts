import { Theme } from '@mui/material/styles'

export const getButtonStyle = (theme: Theme) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
})