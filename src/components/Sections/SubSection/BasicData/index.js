import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, List, ListItem, ListItemText, Button
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'

import { actions as categoriesActions } from 'state/ducks/categories'

import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'

const Details = ({ classes }) => {
  const data = useSelector((state) => state.basicData.data)

  return (
    <Box className={classes.details}>
      <List dense>
        <ListItem>
          <ListItemText
            primary={`DIRECCIÓN:  ${data.direccion}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`DIRECCIÓN:  ${data.manzana}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`SECCIÓN:  ${data.seccion}`}
          />
        </ListItem>
      </List>
    </Box>
  )
}

const BasicData = () => {
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
            onClick={() => dispatch(categoriesActions.sectionBack())}
            className={classes.button}
            startIcon={<ArrowBackIcon />}
          />
          Datos Básicos
        </Typography>
      </Box>
      <Details classes={classes} />
    </ContainerBar>
  )
}

Details.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BasicData
