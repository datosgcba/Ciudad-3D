import React from 'react'

import { Typography } from '@material-ui/core'

import ContainerBar from 'components/Sections/ContainerBar'

import { getGroups } from 'utils/configQueries'

import Group from './Group'
import useStyles from './styles'

const Groups = () => (getGroups().map(({ id, index, title }) => (
  <Group
    key={index}
    id={id}
    title={title}
  />
)))

const Capa = () => {
  const classes = useStyles()

  return (
    <ContainerBar>
      <Typography variant="h5" className={classes.title}>
        Capas
      </Typography>
      <Groups />
    </ContainerBar>
  )
}

export default Capa
