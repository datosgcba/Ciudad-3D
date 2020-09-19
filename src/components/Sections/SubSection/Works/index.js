import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Paper, Typography, List, ListItem, ListItemText, IconButton
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import useFontsStyles from 'theme/fontsDecorators'

import { actions } from 'state/ducks/categories'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/styles'
import useStyles from './styles'

const Details = ({ classes }) => (
  <Box className={classes.details}>
    <List dense>
      <ListItem>
        <ListItemText
          primary="Sup máx edificable: 322 m2"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Altura máxima: 22,80 + dos retiros"
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Tipo de unidad: USAB1"
        />
      </ListItem>
    </List>
  </Box>
)

const Works = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()

  const dispatch = useDispatch()

  return (
    <Box className={classes.box}>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_ml}`}>
          Información
        </Typography>
        <Box className={classes.subTitle}>
          <Typography variant="h6" className={decorators.bold}>
            <IconButton
              onClick={() => dispatch(actions.sectionBack())}
              className={classes.button}
            >
              <ArrowBackIcon />
            </IconButton>
            Obras
          </Typography>
        </Box>
      </Paper>
      <Details classes={classes} />
    </Box>
  )
}

Details.propTypes = {
  classes: PropTypes.objectOf(makeStyles).isRequired
}

export default Works
