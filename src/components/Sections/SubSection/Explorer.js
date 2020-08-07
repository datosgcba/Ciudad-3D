import React from 'react'
import { Paper, CardActionArea, Typography } from '@material-ui/core'
import config from '../../../config'
import useStyles from './exploreStyle'

const getItems = (classes) => {
  const handleGetItem = () => {
    console.log('getItem ')
  }
  return config.grupos.map((g, index) => (
    <CardActionArea className={classes.card} key={index} onClick={handleGetItem}>
      <Typography variant="subtitle1">
        {' '}
        {g.title}
        {' '}
      </Typography>
      <Typography variant="caption">
        {' '}
        {g.help}
        {' '}
      </Typography>
    </CardActionArea>
  ))
}

const Explorer = (props) => {
  const classes = useStyles()
  return (
    <Paper className={classes.box}>
      <Typography variant="h5">
        {' '}
        {props.title}
        {' '}
      </Typography>
      {getItems(classes)}
    </Paper>
  )
}

export default Explorer
