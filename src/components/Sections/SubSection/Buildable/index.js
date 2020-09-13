import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'

import { actions as buildableActions } from 'state/ducks/buildable'
import { actions as categoriesActions } from 'state/ducks/categories'

import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'

const Details = ({ classes }) => {
  const data = useSelector((state) => state.buildable.data)

  return (
    <div>
      <Box className={classes.subDetails}>
        <List dense>
          <ListItem>
            <ListItemText
              primary={
                data
                && data.supMaxEdi !== undefined
                && `Superficie Máxima Edificable ${data.supMaxEdi}`
              }
            />
          </ListItem>
        </List>
      </Box>
      <Box className={classes.subDetails}>
        <List dense>
          <ListItem>
            <ListItemText
              primary={
                data
                && data.supMaxEdi !== undefined
                && `Superficie edificable en planta (pisada)  ${data.supEdiPla}`
              }
            />
          </ListItem>
        </List>
      </Box>

      <Box className={classes.subDetails}>
        <List dense>
          <ListItem>
            <ListItemText primary={
                data
                && data.supMaxEdi !== undefined
                && `Altura Máxima  ${data.altMax}`
              }
            />
          </ListItem>
        </List>
      </Box>

      <Box className={classes.subDetails}>
        <List dense>
          <ListItem>
            <ListItemText primary={
                data
                && data.supMaxEdi !== undefined
                && `Altura Máxima Plano Límite  ${data.altMaxPlaLim}`
              }
            />
          </ListItem>
        </List>
      </Box>

      <Box className={classes.subDetails}>
        <List dense>
          <ListItem>
            <ListItemText primary={
                data
                && data.supMaxEdi !== undefined
                && `Unidad de Edificabilidad  ${data.uniEdi}`
              }
            />

          </ListItem>
        </List>
      </Box>

      <Box className={classes.subDetails}>
        <List dense>
          <ListItem>
            <ListItemText primary={
                data
                && data.supMaxEdi !== undefined
                && `Plusvalía  ${data.plu}`
              }
            />
          </ListItem>
        </List>
      </Box>

      <Box className={classes.subDetails}>
        <List dense>
          <ListItem>
            <ListItemText primary={
                data
                && data.supMaxEdi !== undefined
                && `Factor Ocupacional Total  ${data.facOcuTot}`
              }
            />
          </ListItem>
        </List>
      </Box>

      <Box className={classes.subDetails}>
        <List dense>
          <ListItem>
            <ListItemText primary={
                data
                && data.supMaxEdi !== undefined
                && `Listado SMP de Parcelas Linderas  ${data.lisSMPParLin}`
              }
            />
          </ListItem>
        </List>
      </Box>
    </div>
  )
}

const Buildable = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()

  const dispatch = useDispatch()
  const smp = useSelector((state) => state.basicData.data.smp)
  useEffect(() => {
    dispatch(buildableActions.clickOnParcel(smp))
  }, [dispatch, smp])
  return (
    <ContainerBar>
      <Typography
        variant="h5"
        className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_xl}`}
      >
        Información
      </Typography>
      <Box className={classes.subTitle}>
        <Typography variant="h6" className={decorators.bold}>
          <IconButton
            onClick={() => dispatch(categoriesActions.sectionBack())}
            className={classes.button}
          >
            <ArrowBackIcon />
          </IconButton>
          Edificabilidad
        </Typography>
      </Box>
      <Details classes={classes} decorators={decorators} />
    </ContainerBar>
  )
}

Details.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired
}

export default Buildable
