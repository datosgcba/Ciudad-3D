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
  // seekerSmp es el smp obtenido por el buscador
  const seekerSmp = useSelector((state) => state.seeker.place.data.smp)

  // Se obtienen los datos básicos de la parcela seleccionada
  useEffect(() => {
    dispatch(basicDataActions.selectedParcel(parcelCoords))
  }, [parcelCoords, dispatch])

  useEffect(() => {
    dispatch(basicDataActions.seekerParcel(seekerSmp))
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

  const path = <svg id="info" xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="currentColor" width="28" height="28" viewBox="0 0 28 28"><g id="Grupo_45" data-name="Grupo 45"><path id="Trazado_13" data-name="Trazado 13" d="M23.9,4.1A14,14,0,0,0,4.1,23.9,14,14,0,0,0,23.9,4.1ZM14,3.828a3.008,3.008,0,1,1-3.008,3.008A3.011,3.011,0,0,1,14,3.828Zm3.828,19.141H10.172V21.328h1.641v-8.2H10.172V11.484h6.016v9.844h1.641Z" /></g></svg>
  return (
    <Box className={classes.options}>
      {
        // TODO: agregar path
        data.map(({ id, title }) => (
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
