import React from 'react'

import { Box, Drawer, makeStyles } from '@material-ui/core'

import Categories from 'components/Categories/Categories'
import Logo from 'components/Logo/Logo'
import { getCategories } from 'utils/configQueries'

const data = getCategories()
const useStyles = makeStyles((theme) => ({
  sideBarPaper: {
    width: theme.spacing(9.75),
    background: theme.palette.secondary.main
  },
  logo: {
    marginTop: theme.spacing(1)
  }
}))

const ConnectedPanel = () => {
  const classes = useStyles()
  return (
    <Drawer
      variant="persistent"
      open
      PaperProps={{ elevation: 8, className: classes.sideBarPaper }}
    >
      <Box className={classes.logo}>
        <Logo />
      </Box>
      <Categories data={data} />
    </Drawer>
  )
}

export default ConnectedPanel
