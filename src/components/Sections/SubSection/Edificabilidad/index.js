import React from 'react'

import {
  Container, Box, Typography, List, ListItem, ListItemText
} from '@material-ui/core'
import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'
import PropTypes from 'prop-types'
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

const Edificabilidad = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()

  return (
    <ContainerBar>
      <Typography variant="h5" className={`${decorators.marginTop_md} ${decorators.marginBottom_xl}`}>
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

Details.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Edificabilidad
