import React from 'react'

import {
  Paper, Typography
} from '@material-ui/core'
import BuildIcon from '@material-ui/icons/Build'

import Scrollbar from 'react-smooth-scrollbar'

import useStyles from './styles'

const Contact = () => {
  const classes = useStyles()

  return (
    <Scrollbar>
      <Paper className={classes.paper}>
        <Typography variant="h6" className={classes.title}>
          EN CONSTRUCCIÓN
        </Typography>
        <BuildIcon style={{ width: '100px', height: '100px' }} />
      </Paper>
    </Scrollbar>
  )
}

export default Contact
