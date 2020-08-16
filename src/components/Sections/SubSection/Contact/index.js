import React from 'react'

import BuildIcon from '@material-ui/icons/Build'
import { Typography } from '@material-ui/core'

import ContainerBar from 'components/Sections/ContainerBar'

import useStyles from './styles'

const Contact = () => {
  const classes = useStyles()

  return (
    <ContainerBar>
      <Typography variant="h6" className={classes.title}>
        EN CONSTRUCCIÓN
      </Typography>
      <BuildIcon style={{ width: '100px', height: '100px' }} />
    </ContainerBar>
  )
}

export default Contact
