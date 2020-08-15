import React from 'react'

import { Paper, CardActionArea, Typography } from '@material-ui/core'

import config from 'config'
import useStyles from './styles'

const getItems = (classes) => {
  const handleGetItem = () => {
    console.log('getItem ')
  }
  return config.grupos.map((g, index) => (
    <CardActionArea className={classes.card} key={index} onClick={handleGetItem}>
      <Typography className={classes.cardTitulo}>
        {g.title}
      </Typography>
      <Typography className={classes.cardCuerpo}>
        {g.help}
      </Typography>
    </CardActionArea>

  ))
}

const Information = (props) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">
        {props.title}
      </Typography>
      {getItems(classes)}
    </Paper>
  )
}

export default Information
