import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, List, ListItem, ListItemText, Button
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'

import { actions } from 'state/ducks/categories'
import { useDispatch } from 'react-redux'

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

const Usos = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()

  const dispatch = useDispatch()

  return (
    <ContainerBar>
      <Typography variant="h5" className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_xl}`}>
        Información
      </Typography>
      <Box className={classes.box}>
        <Typography variant="h6" className={decorators.bold}>
          <Button
            onClick={() => dispatch(actions.categorySelected('Information'))}
            className={classes.button}
            startIcon={<ArrowBackIcon />}
          />
          Usos
        </Typography>
      </Box>
      <Details classes={classes} />
    </ContainerBar>
  )
}

Details.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Usos
