// TODO: proptypes
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react'
// import PropTypes from 'prop-types'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

export default ({ coords }) => {
  const refMarker = useRef(null)
  const mapUtils = MapaInteractivoGL()
  const engine = mapUtils.getMapEngine()
  const [marker] = useState(new engine.Marker())

  useEffect(() => {
    marker
      .setLngLat([coords.lng, coords.lat])
      .addTo(mapUtils.map)
    refMarker.current.innerHTML = null
    refMarker.current.appendChild(marker.getElement())
  }, [coords, mapUtils.map, marker, refMarker])

  return (<div ref={refMarker} />)
}
