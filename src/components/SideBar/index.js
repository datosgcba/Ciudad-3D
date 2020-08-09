import React from 'react'

import { Drawer, makeStyles } from '@material-ui/core'

import Categories from 'components/Categories/Categories'
import config from 'config'

const useStyles = makeStyles((theme) => ({
  sideBarPaper: {
    width: theme.spacing(9.75),
    background: theme.palette.secondary.main,
  },
  container: {
    marginTop: theme.spacing(4),
  },
}))

const ConnectedPanel = () => {
  const classes = useStyles()

  return (
    <Drawer
      variant="persistent"
      open
      PaperProps={{ elevation: 8, className: classes.sideBarPaper }}
    >
      <Categories data={config.categorias} />
    </Drawer>
  )
}

export default ConnectedPanel
