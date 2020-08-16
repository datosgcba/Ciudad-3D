import React from 'react'

import { Typography } from '@material-ui/core'

import PanelContainer from 'components/Sections/PanelContainer'

import config from 'config'
import useStyles from './styles'

import Groups from './Groups'

const GroupsList = () => (config.grupos.map((g, index) => (
  <Groups
    key={index}
    color={g.color}
    title={g.title}
    help={g.help}
    layers={g.layers}
  />
)))

const Capa = () => {
  const classes = useStyles()

  return (
    <PanelContainer>
      <Typography variant="h6" className={classes.title}>
        Capas
      </Typography>
      <GroupsList />
    </PanelContainer>
  )
}

export default Capa
