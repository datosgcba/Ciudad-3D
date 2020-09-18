import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import { actions } from 'state/ducks/categories'
import { actions as basicDataActions } from 'state/ducks/basicData'

import { Box } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'

import Category from './Category'
import useStyles from './styles'

const Categories = ({ data }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const isMapReady = useSelector((state) => state.map.isMapReady)
  const sectionOpen = useSelector((state) => state.categories.sectionOpen)

  // parcelCoords son las coordenadas donde se hace click
  const parcelCoords = useSelector((state) => state.map.selectedCoords)
  // seekerCoords son las coordenadas obtenidas por el buscador
  const seekerSmp = useSelector((state) => state.seeker.place.data.smp)

  // Se obtienen los datos básicos de la parcela seleccionada
  useEffect(() => {
    dispatch(basicDataActions.selectedParcel(parcelCoords))
  }, [parcelCoords, dispatch])

  useEffect(() => {
    if (seekerSmp !== null && seekerSmp !== undefined) {
      dispatch(basicDataActions.seekerParcel(seekerSmp))
    }
  }, [seekerSmp, dispatch])

  // Se abre el panel Information al seleccionar una parcela o hacer una busqueda
  useEffect(() => {
    if (isMapReady && parcelCoords !== null && !sectionOpen) {
      const openPanel = 'Information'
      dispatch(actions.categorySelected(openPanel))
    }
  // TODO: Agregar sectionOpen a las dependencias del useEffect sin perder funcionalidad
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapReady, parcelCoords, dispatch])

  return (
    <Box className={classes.options}>
      {
        data.map(({ id, path, title }) => (
          <Category
            key={id}
            id={id}
            path={path}
            title={title}
          />
        ))
      }
    </Box>
  )
}

Categories.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Categories
