import React from 'react'

import { Paper } from '@material-ui/core'
import Scrollbar from 'react-smooth-scrollbar'

import PropTypes from 'prop-types'
import useStyles from './ContainerBarStyles'

const ContainerBar = ({ children }) => {
  const classes = useStyles()

  return (
    <Scrollbar>
      <Paper className={classes.paper}>
        {children}
      </Paper>
    </Scrollbar>
  )
}
ContainerBar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default ContainerBar
