import { useEffect } from 'react'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

import { actions as parcelActions } from 'state/ducks/parcel'

import { useSelector, useDispatch } from 'react-redux'

const Parcel = () => {
  const dispatch = useDispatch()
  const mapGL = MapaInteractivoGL()
  const smp = useSelector((state) => state.parcel.smp)
  const geomCoords = useSelector((state) => state.parcel.geomCoords)

  const layer = mapGL.map.getLayer('Parcel')
  const source = mapGL.map.getSource(smp)

  if (layer !== undefined) {
    mapGL.map.removeLayer('Parcel')
  }

  useEffect(() => {
    dispatch(parcelActions.smpSelected(smp))
  }, [smp])

  useEffect(() => {
    if (geomCoords !== null) {
      if (source === undefined) {
        mapGL.map.addSource(smp, {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [geomCoords]
            }
          }
        })
      }

      mapGL.map.addLayer({
        id: 'Parcel',
        type: 'fill',
        source: smp,
        layout: {},
        paint: {
          'fill-color': '#DD0083',
          'fill-outline-color': '#DD0093',
          'fill-opacity': 0.5
        }
      })
    }
  }, [geomCoords])

  return null
}

export default Parcel
