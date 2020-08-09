import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import config from '../../../../config'
import Groups from './Groups'
import useStyles from './styles.js'
import Scrollbar from 'react-smooth-scrollbar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const getGroups = () => (config.grupos.map((g, index) => (
  <Groups
    key={index}
    color={g.color}
    title={g.title}
    help={g.help}
    layers={g.layers}
  />
)))

const Visualize = () => {
  const classes = useStyles()

  return (
    <Scrollbar>
      <Paper className={classes.paper}>
        <ArrowBackIcon />
        <Typography variant="h6">
          Visualizar
        </Typography>
        {getGroups()}  {/*Pasar a componente*/}
      </Paper>
    </Scrollbar>
  )
}

export default Visualize
