import React from 'react'

import {
  Paper, Typography
} from '@material-ui/core'

import useStyles from './styles'

const LayerGroup = () => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Typography variant="body1" className={classes.body1}>
        Seleccione una parcela
      </Typography>
    </Paper>
  )
}

export default LayerGroup
