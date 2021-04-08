import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { ButtonBase } from '@material-ui/core'
import Timeline from '@material-ui/icons/Timeline'

import Lines from 'components/Lines'

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

  const controlGroup = document.querySelector('.mapboxgl-ctrl-top-right .mapboxgl-ctrl-group')
  useEffect(() => {
    if (controlGroup) {
      controlGroup.appendChild(refMenu.current)
    }
  }, [refMenu, controlGroup])

  const handleMeasure = () => {
    setIsActive(!isActive)
  }

  return (
    <>
      { isActive && (
      <Lines points={coordinates} />
      ) }
      
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
