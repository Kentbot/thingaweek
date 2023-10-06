import React from 'react'

import { List, ListItem as MuiListItem, ListItemIcon, ListItemText } from '@mui/material'
import Typography from '@mui/material/Typography'
import CircleIcon from '@mui/icons-material/CircleOutlined'

export default function SiteOverview() {
  return (
    <>
      <Typography variant="h4">
        Welcome to my website!
      </Typography>
      <Typography variant="body1" sx={{ pt: 3 }}>
        This site is where I keep all my experiments with web technologies. I have plans for
        learning about things like:
      </Typography>
      <List>
        <ListItem
          text="Material UI (MUI) - This site is actually written with MUI right now! I'm still learning
          all of the in's and out's of MUI, and so far I really like how it works.">
        </ListItem>
        <ListItem
          text="serverless functions (AWS Lambda, Google Cloud Functions, something like these)">
        </ListItem>
        <ListItem
          text="Any cool JS libraries that I find out about">
        </ListItem>
        <ListItem
          text="And more!">
        </ListItem>
      </List>
    </>
  )
}

function ListItem(props: React.PropsWithChildren & { text: string }) {
  return (
    <MuiListItem>
      <ListItemIcon>
        <CircleIcon />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="body2">
          {props.text}
        </Typography>
      </ListItemText>
    </MuiListItem>
  )
}