import { useState, useEffect } from 'react'

import { actions as parcelActions } from 'state/ducks/parcel'

import { useDispatch, useSelector } from 'react-redux'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

const Parcel = ({ smp }) => {
  const mapGL = MapaInteractivoGL()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(parcelActions.smpSelected(smp))
  }, [smp])

  const [previousSmp, setPreviousSmp] = useState(null)
  const coords = useSelector((state) => state.parcel.data)

  useEffect(() => {
    if (previousSmp !== null) {
      mapGL.map.removeLayer(previousSmp)
      mapGL.map.removeSource(previousSmp)
    }

    if (coords !== null) {
      mapGL.map.addSource(smp, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [coords]
          }
        }
      })
      mapGL.map.addLayer({
        id: smp,
        type: 'fill',
        source: smp,
        layout: {},
        paint: {
          'fill-color': '#DD0083',
          'fill-outline-color': '#DD0093',
          'fill-opacity': 0.5
        }
      })
      setPreviousSmp(smp)
    }
  }, [coords])

  return null
}

export default Parcel
