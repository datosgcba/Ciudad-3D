import React from 'react'

import {
  Container, Paper, Typography, Button, IconButton
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { CategorySelected } from 'store/actions'
import { useDispatch } from 'react-redux'

import useStyles from './styles'

const X_Barrio = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  return (
    <Paper className={classes.paper}>
      <IconButton className={classes.iconButton}>
        <ArrowBackIcon className={classes.arrow} />
      </IconButton>
      <Container className={classes.container}>
        <Typography variant="subtitle1" className={classes.subtitle}>
          BARRIO
        </Typography>
        <br />
        <br />
        <br />
        <Typography variant="h6" className={classes.title}>
          Los acordeones acá
        </Typography>
        <br />
        <br />
        <br />
        <Button className={classes.button} onClick={() => dispatch(CategorySelected('Visualizar'))}>
          Visualizar
        </Button>
      </Container>
    </Paper>
  )
}

export default X_Barrio
