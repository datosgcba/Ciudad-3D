import React from 'react'

import { Paper } from '@material-ui/core'

import Scrollbar from 'react-smooth-scrollbar'

import useStyles from './styles'

const PanelContainer = () => {
  const classes = useStyles()

  return (
    <Scrollbar>
      <Paper className={classes.paper} />
    </Scrollbar>
  )
}

export default PanelContainer
