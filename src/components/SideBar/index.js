import React from 'react'

import { Drawer, makeStyles } from '@material-ui/core'

import Categories from 'components/Categories/Categories'
import Logo from 'components/Logo/Logo'

import config from 'appConfig'

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
      <div className={classes.logo}>
        <Logo />
      </div>
      <Categories data={config.categorias} />
    </Drawer>
  )
}

export default ConnectedPanel
