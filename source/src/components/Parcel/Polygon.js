import { useEffect } from 'react'

import { getParcelLayer } from 'utils/configQueries'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

const parcelId = 'parcel_layer'
const Polygon = ({ smpList, geomCoords }) => {
  const mapGL = MapaInteractivoGL()

  const { edif, polygon: { paint, type, layout } } = getParcelLayer()
  const { id: edifId } = edif
  useEffect(() => {
    mapGL.map.addLayer(edif)
    return () => {
      mapGL.map.removeLayer(edifId)
      mapGL.map.removeSource(edifId)
    }
  }, [edif, edifId, mapGL])

  useEffect(() => {
    const parcel3D = mapGL.map.getLayer(edifId)
    if (parcel3D !== undefined) {
      mapGL.setFilter(
        edifId,
        ['in', ['upcase', ['get', 'smp']], smpList.join(',').toUpperCase()]
      )
    }
  }, [mapGL, smpList, edifId])

  useEffect(() => {
    if (geomCoords !== null) {
      const source = mapGL.map.getSource(parcelId)
      if (source === undefined) {
        mapGL.map.addSource(parcelId, {
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
        id: parcelId,
        source: parcelId,
        type,
        layout,
        paint
      })
      mapGL.map.moveLayer(parcelId, edifId)
    }
    return () => {
      mapGL.map.removeLayer(parcelId)
      mapGL.map.removeSource(parcelId)
    }
  }, [geomCoords, mapGL, paint, type, layout, edifId])

  return null
}

export default Polygon
