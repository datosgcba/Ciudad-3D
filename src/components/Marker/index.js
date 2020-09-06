// import React, { useEffect } from 'react'
import { useEffect } from 'react'

// import PropTypes from 'prop-types'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'
import tooltip from 'utils/Tooltip'

export default ({ place, flag }) => {
  /* TODO: Trabajando en este archivo */
  // console.log(flag)
  const map = MapaInteractivoGL()
  //const markerJSX = marker => `<>${}</>`
  useEffect(() => {
    if(place && place.data && place.data.coordenadas) {
      const coords = place.data.coordenadas
      tooltip.addPopup(map, coords, place.title)
    }
  }, [place, map])

  return null
}
