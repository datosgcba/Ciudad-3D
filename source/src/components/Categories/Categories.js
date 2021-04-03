import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import { actions as basicDataActions } from 'state/ducks/basicData'

import { Box } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'

import Category from './Category'
import useStyles from './styles'

const Categories = ({ data }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const parcelCoords = useSelector((state) => state.map.selectedCoords)
  const seekerSmp = useSelector((state) => state.seeker.place.data.smp)

  // Se obtienen los datos básicos de la parcela seleccionada
  useEffect(() => {
    dispatch(basicDataActions.selectedParcel(parcelCoords))
  }, [parcelCoords, dispatch])

  useEffect(() => {
    dispatch(basicDataActions.seekerParcel(seekerSmp))
  }, [seekerSmp, dispatch])

  return (
    <Box className={classes.options}>
      {
        data.map(({
          id, title, path, url
        }) => (
          <Category
            key={id}
            id={id}
            path={path}
            title={title}
            url={url}
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
