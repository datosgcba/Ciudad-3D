import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  Box,
  IconButton,
  Popper
} from '@material-ui/core'
import Timeline from '@material-ui/icons/Timeline'

import Lines from 'components/Lines'
import useStyles from './styles'

const Measure = () => {
  const [isActive, setIsActive] = useState(false)
  const [coordinates, setCoordinates] = useState([])
  const coord = useSelector((state) => state?.map?.selectedCoords)
  const refMenu = useRef(null)

  useEffect(() => {
    if (isActive && coord) {
      const { lng, lat } = coord
      if (!coordinates.find(([ln, la]) => ln === lng && la === lat)) {
        setCoordinates([...coordinates, [lng, lat]])
      }
    }
  }, [coord, coordinates])

  useEffect(() => {
    if (!isActive) {
      setCoordinates([])
    }
  }, [isActive])

  const handleMeasure = () => {
    setIsActive(!isActive)
  }

  const classes = useStyles()
  return (
    <Box>
      { isActive && (
      <Lines points={coordinates} />
      ) }
      <IconButton
        ref={refMenu}
        color={isActive ? 'primary' : 'secondary'}
        onClick={handleMeasure}
        className={classes.button}
      >
        <Timeline />
      </IconButton>
    </Box>
  )
}

export default Measure
