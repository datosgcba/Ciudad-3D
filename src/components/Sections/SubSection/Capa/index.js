import React from 'react'

import { Paper, Typography } from '@material-ui/core'
import Scrollbar from 'react-smooth-scrollbar'

import { getGroups } from 'utils/configQueries'

import Group from './Group'

import useStyles from './styles'

const Groups = () => (getGroups().map(({ index, title }) => (
  <Group
    key={index}
    index={index}
    title={title}
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
        <Groups />
      </Paper>
    </Scrollbar>
  )
}

export default Capa
