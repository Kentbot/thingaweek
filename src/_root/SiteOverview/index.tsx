import React from 'react'

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
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
          <List>
            <MyListItem
              text="Material UI (MUI) - This site is actually written with MUI right now! I'm still learning
              all of the in's and out's of MUI, and so far I really like how it works.">
            </MyListItem>
            <MyListItem
              text="serverless functions (AWS Lambda, Google Cloud Functions, something like these)">
            </MyListItem>
            <MyListItem
              text="Any cool JS libraries that I find out about">
            </MyListItem>
            <MyListItem
              text="And more!">
            </MyListItem>
          </List>
      </Typography>
    </>
  )
}

function MyListItem(props: React.PropsWithChildren & { text: string }) {
  return (
    <ListItem>
      <ListItemIcon>
        <CircleIcon />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="body2">
          {props.text}
        </Typography>
      </ListItemText>
    </ListItem>
  )
}