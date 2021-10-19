import React, { useEffect, useRef, useState } from 'react'
import { ButtonBase } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { actions as mapActions } from 'state/ducks/map'
import useStyles from './styles'

const DimensionBtn = () => {
  // const isActive = useSelector((state) => !!state?.map?.isMeasureActive)
  // const [coordinates, setCoordinates] = useState([])
  const [Dimension, setDimension] = useState(false)
  // const coord = useSelector((state) => state?.map?.selectedCoords)
  const refMenu = useRef(null)

  const dispatch = useDispatch()

  const dimensionChange = () => {
    setDimension(!Dimension)
    if (Dimension === true) {
      dispatch(mapActions.cameraUpdated({
        pitch: 0
      }))
    } else {
      dispatch(mapActions.cameraUpdated({
        pitch: 60
      }))
    }
  }

  const controlGroup = document.querySelector('.mapboxgl-ctrl-top-right .mapboxgl-ctrl-group')
  useEffect(() => {
    if (controlGroup) {
      controlGroup.appendChild(refMenu.current)
    }
  }, [refMenu, controlGroup])

  const classes = useStyles()
  return (
    <>
      <ButtonBase
        className={classes.Button}
        ref={refMenu}
        onClick={dimensionChange}
      >
        {Dimension ? '2D' : '3D'}
      </ButtonBase>
    </>
  )
}

export default DimensionBtn
