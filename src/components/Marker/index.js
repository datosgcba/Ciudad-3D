// TODO: proptypes y tooltip
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react'
// import PropTypes from 'prop-types'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'
import tooltip from 'utils/Tooltip'

export default ({ place }) => {
  const refMarker = useRef(null)
  const map = MapaInteractivoGL()
  useEffect(() => {
    if (place && place.data && place.data.coordenadas) {
      const coords = place.data.coordenadas
      tooltip.addPopup(map, coords, place.title)
        .then((markerMap) => {
          refMarker.current.innerHTML = null
          refMarker.current.appendChild(markerMap.getElement())
        })
    }
  }, [place, map])

  return (<div ref={refMarker} />)
}
