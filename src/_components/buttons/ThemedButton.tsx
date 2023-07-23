import { Button, ButtonProps, styled } from '@mui/material'

import { getButtonStyle } from './buttonStyle'

export const ThemedButton = styled(Button)<ButtonProps>(({ theme }) => getButtonStyle(theme))

