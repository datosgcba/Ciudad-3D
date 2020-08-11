import React from 'react'

import { Paper, Typography, IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import Scrollbar from 'react-smooth-scrollbar'

import { CategorySelected } from 'store/actions'
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

const Visualize = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <Scrollbar>
      <Paper className={classes.paper}>
        <IconButton className={classes.button} onClick={() => dispatch(CategorySelected('Información'))}>
          <ArrowBackIcon className={classes.arrow} />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Visualizar
        </Typography>
        <GroupsList />
      </Paper>
    </Scrollbar>
  )
}

export default Visualize
