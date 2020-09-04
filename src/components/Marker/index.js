import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import Geocoder from 'utils/GeoLocation'
import MapaInteractivoGL from 'utils/MapaInteractivoGL'
import { tooltip } from 'utils/Tooltip'

export default ({ place, flag }) => {
/* TO DO */  console.log(flag)
  const map = MapaInteractivoGL()
  useEffect(() => {
    Geocoder.fetchGeolocation(place)
      .then((coords) => tooltip.addPopup(map, coords, place.title, flag))
  }, [place, Geocoder, map])

  return null
}
