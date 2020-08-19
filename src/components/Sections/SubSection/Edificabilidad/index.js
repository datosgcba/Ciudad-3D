import React from 'react'

import {
  Container, Box, Typography, IconButton, List, ListItem, ListItemText
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

// import PropTypes from 'prop-types'

import ContainerBar from 'components/Sections/ContainerBar'

import { getDetails } from 'utils/configQueries'

import useStyles from './styles'

const Details = ({ classes }) => (getDetails().map(({ data }) => (
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
)))

const Edificabilidad = () => {
  const classes = useStyles()

  return (
    <ContainerBar>
      <Typography variant="h5" className={classes.title}>
        Información
      </Typography>
      <Container className={classes.container}>
        <Typography variant="h6">
          Edificabilidad
        </Typography>
      </Container>
      <Details classes={classes} />
    </ContainerBar>
  )
}

/*
Edificabilidad.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}
*/
export default Edificabilidad
