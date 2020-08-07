import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import config from '../../config'
import Categories from '../Categories/Categories'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}))

const ConnectedPanel = () => {
  const classes = useStyles()

  const getCategories = () => config.categorias.map((c, index) => (
    <Categories key={index} title={c.title} path={c.path} />
  ))
  return <Container className={classes.container}>{getCategories()}</Container>
}

export default ConnectedPanel
