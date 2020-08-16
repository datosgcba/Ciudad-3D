import React from 'react'

import { Typography } from '@material-ui/core'

import ContainerBar from 'components/Sections/ContainerBar'

import config from 'config'
import useStyles from './styles'

import Groups from './Groups'

const GroupsList = () => (config.grupos.map((g) => (
  <Groups
    color={g.color}
    title={g.title}
    help={g.help}
    layers={g.layers}
  />
)))

const Capa = () => {
  const classes = useStyles()

  return (
    <ContainerBar>
      <Typography variant="h6" className={classes.title}>
        Capas
      </Typography>
      <GroupsList />
    </ContainerBar>
  )
}

export default Capa
