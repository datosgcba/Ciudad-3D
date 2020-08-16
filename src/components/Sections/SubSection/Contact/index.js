import React from 'react'

import BuildIcon from '@material-ui/icons/Build'
import { Typography } from '@material-ui/core'

import PanelContainer from 'components/Sections/PanelContainer'

import useStyles from './styles'

const Contact = () => {
  const classes = useStyles()

  return (
    <PanelContainer>
      <Typography variant="h6" className={classes.title}>
        EN CONSTRUCCIÓN
      </Typography>
      <BuildIcon style={{ width: '100px', height: '100px' }} />
    </PanelContainer>
  )
}

export default Contact
