import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions as mapActions } from 'state/ducks/map'

import { Explore } from '@material-ui/icons'

import {
  Box,
  IconButton
} from '@material-ui/core'

import useStyles from './styles'

const North = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const cameraPitch = useSelector((state) => state.map.camera?.pitch)
  const cameraBearing = useSelector((state) => state.map.camera?.bearing)
  const [isNorth, setIsNorth] = useState(cameraPitch === 0 && cameraBearing === 0)

  useEffect(() => {
    setIsNorth(cameraPitch === 0 && cameraBearing === 0)
  }, [cameraBearing, cameraPitch])

  const handleNorth = () => {
    dispatch(mapActions.cameraUpdated({
      pitch: 0, bearing: 0
    }))
  }

  return (
    <Box>
      <IconButton
        color={isNorth ? 'primary' : 'secondary'}
        onClick={handleNorth}
        className={classes.button}
      >
        <Explore className={isNorth && classes.northOrientation} />
      </IconButton>
    </Box>
  )
}
export default North
