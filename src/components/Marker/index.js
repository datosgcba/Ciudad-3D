import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import Geocoder from 'utils/GeoLocation'
import MapaInteractivoGL from 'utils/MapaInteractivoGL'
import { tooltip } from 'utils/Tooltip'

export default ({ place }) => {
  const map = MapaInteractivoGL()
  useEffect(() => {
    console.log('place', place.data)
    Geocoder.fetchGeolocation(place)
      .then((coords) => tooltip.addPopup(map, coords, place))
  }, [place, Geocoder, map])

  return null
}
