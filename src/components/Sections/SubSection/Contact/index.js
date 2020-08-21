import React from 'react'

import BuildIcon from '@material-ui/icons/Build'
import { Typography } from '@material-ui/core'

import FontsTest from 'theme/FontsTest'

import ContainerBar from 'components/Sections/ContainerBar'

const Contact = () => (
  <ContainerBar>
    <Typography variant="caption">EN CONSTRUCCIÓN</Typography>
    <BuildIcon />
    <FontsTest />
  </ContainerBar>
)

export default Contact
