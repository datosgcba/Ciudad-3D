import React, { useEffect, useRef, useState } from 'react'
import { ButtonBase, debounce } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { actions as mapActions } from 'state/ducks/map'
import useStyles from './styles'

const DimensionBtn = () => {
  const cameraPitch = useSelector((state) => state.map.camera?.pitch)
  const [Dimension, setDimension] = useState(false)
  const refMenu = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (cameraPitch === 0) {
      setDimension(false)
    } else {
      setDimension(true)
    }
  }, [cameraPitch])

  const dimensionChange = () => {
    if (Dimension) {
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
        onClick={debounce(() => dimensionChange(), 100)}
      >
        {Dimension ? '2D' : '3D' }
      </ButtonBase>
    </>
  )
}

export default DimensionBtn
