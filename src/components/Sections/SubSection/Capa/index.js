import React from 'react'

import { Typography } from '@material-ui/core'

import ContainerBar from 'components/Sections/ContainerBar'

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
    <ContainerBar>
      <Typography variant="h6" className={classes.title}>
        Capas
      </Typography>
      <Groups />
    </ContainerBar>
  )
}

export default Capa
