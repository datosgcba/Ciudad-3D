import React from 'react'

import { Paper, Typography, IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import Scrollbar from 'react-smooth-scrollbar'

import { categorySelected } from 'state/ducks/categories'
import { useDispatch } from 'react-redux'

import config from 'config'
import useStyles from './styles'

import Groups from './Groups'

const GroupsList = () => (config.grupos.map((g, index) => (
  <Groups
    key={index}
    color={g.color}
    title={g.title}
    help={g.help}
    layers={g.layers}
  />
)))

const Capa = () => {
  const classes = useStyles()

  return (
    <Scrollbar>
      <Paper className={classes.paper}>
        <Typography variant="h6" className={classes.title}>
          Capas
        </Typography>
        <GroupsList />
      </Paper>
    </Scrollbar>
  )
}

export default Capa
