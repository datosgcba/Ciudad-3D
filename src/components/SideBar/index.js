import React from 'react'

import { Container, Drawer, makeStyles, Paper } from '@material-ui/core'

import Categories from '../Categories/Categories'
import config from '../../config'

const useStyles = makeStyles((theme) => {
console.log('theme',theme.palette.secondary.main)
  return ({
  sideBarPaper: {
    width: theme.spacing(9.75),
    background: theme.palette.secondary.main,
  },
  container: {
    marginTop: theme.spacing(4),
  },
})})


const ConnectedPanel = () => {
  const classes = useStyles()

  const getCategories = () => config.categorias.map((c) => (
    <Categories key={c.title} title={c.title} path={c.path} />
  ))

  return (
    <Drawer
      variant="persistent"
      open
      PaperProps={{ elevation: 8, className: classes.sideBarPaper }}
    >
      {getCategories()}
    </Drawer>
  )
}

export default ConnectedPanel
