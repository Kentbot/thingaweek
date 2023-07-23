import { LinkProps } from 'react-router-dom'

import { Button, styled } from '@mui/material'

import { getButtonStyle } from './buttonStyle'

export const NavLinkButton = styled(Button)<LinkProps>(({ theme }) => getButtonStyle(theme))