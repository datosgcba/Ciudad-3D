import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import { actions } from 'state/ducks/categories'
import { actions as basicDataActions } from 'state/ducks/basicData'

import { Box } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'

import Category from './Category'
import useStyles from './style'

const Categories = ({ data }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  // Se obtienen los datos básicos de la parcela seleccionada
  const coord = useSelector((state) => state.map.coord)
  useEffect(() => {
    dispatch(basicDataActions.clickOnParcel(coord))
  }, [coord])

  // Se abre el panel BasicData al seleccionar una parcela
  const isMapReady = useSelector((state) => state.map.isMapReady)
  const sectionIds = useSelector((state) => state.categories.sectionId)
  useEffect(() => {
    if (isMapReady && coord !== '' && sectionIds[0] === '') {
      const openPanel = 'Information'
      dispatch(actions.categorySelected(openPanel))
    }
  }, [isMapReady, coord])

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
