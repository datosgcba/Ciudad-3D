import React from "react"
import { Paper, Card, Typography } from "@material-ui/core"
import config from "../../../config"
import useStyles from './exploreStyle'

const getItems = (classes) => {
  return config.grupos.map((g, index) => (
    <Card className={classes.card} key={index}>
      <Typography variant="subtitle1"> {g.title} </Typography>
      <Typography variant="caption"> {g.help} </Typography>
    </Card>
  ))
}

const Explorer = (props) => {
  const classes = useStyles()
  return (
    <Paper className={classes.box}>
      <Typography variant="h5"> {props.title} </Typography>
      {getItems(classes)}
    </Paper>
  )
}

export default Explorer
