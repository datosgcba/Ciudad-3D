import React from 'react'

import { Container, Drawer, makeStyles, Paper } from '@material-ui/core'

import Categories from '../Categories/Categories'
import config from '../../config'

const useStyles = makeStyles((theme) => ({
  sideBar: {
    backgroundColor: 'green',
    width: theme.spacing(10),
    height:'100%'
  },
  container: {
    marginTop: theme.spacing(4),
  },
}))

const ConnectedPanel = () => {
  const classes = useStyles()

  const getCategories = () => config.categorias.map((c) => (
    <Categories key={c.title} title={c.title} path={c.path} />
  ))

  return (
    <Drawer variant="persistent" open PaperProps={{ elevation: 8 }}>
      {getCategories()}
    </Drawer>
  )
}

export default ConnectedPanel
