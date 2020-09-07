import { useEffect } from 'react'

import { actions as parcelActions } from 'state/ducks/parcel'

import { useDispatch, useSelector } from 'react-redux'

const Parcel = ({ mapGL }) => {
  // TODO: Rehacer prolijamente y solucionar bug al reseleccionar una parcela (removeSource())

  const smp = useSelector((state) => state.basicData.data.smp)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(parcelActions.smpSelected(smp))
  }, [smp])

  const coords = useSelector((state) => state.parcel.data)
  const previousSmp = useSelector((state) => state.basicData.previousSmp)

  useEffect(() => {
    mapGL.map.removeLayer(previousSmp)
    // mapGL.map.removeSource(previousSmp)

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
        'fill-color': 'green',
        'fill-outline-color': 'blue',
        'fill-opacity': 0.2
      }
    })
  }, [coords])

  return null
}

export default Parcel
