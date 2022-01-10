import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { actions as mapActions } from 'state/ducks/map'

import { ButtonBase } from '@material-ui/core'
import Timeline from '@material-ui/icons/Timeline'

import Lines from 'components/Lines'

const Measure = () => {
  const isActive = useSelector((state) => !!state?.map?.isMeasureActive)
  const [coordinates, setCoordinates] = useState([])
  const coord = useSelector((state) => state?.map?.selectedCoords)
  const refMenu = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isActive && coord) {
      const { lng, lat } = coord
      if (!coordinates.find(([ln, la]) => ln === lng && la === lat)) {
        setCoordinates([...coordinates, [lng, lat]])
      }
    }
  }, [isActive, coord, coordinates])

  useEffect(() => {
    if (!isActive) {
      setCoordinates([])
    }
  }, [isActive])

  const controlGroup = document.querySelector('.mapboxgl-ctrl-top-right .mapboxgl-ctrl-group')
  useEffect(() => {
    if (controlGroup) {
      controlGroup.appendChild(refMenu.current)
    }
  }, [refMenu, controlGroup])

  const handleMeasure = () => {
    dispatch(mapActions.isMeasureActive(!isActive))
  }

  return (
    <>
      { isActive && (
      <Lines points={coordinates} />
      ) }
      <ButtonBase ref={refMenu}>
        <Timeline
          color={isActive ? 'primary' : 'inherit'}
          onClick={handleMeasure}
        />
      </ButtonBase>
    </>
  )
}

export default Measure
