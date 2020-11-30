import { useEffect } from 'react'

import { getParcelLayer } from 'utils/configQueries'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

const parcelId = 'parcel_layer'
const Polygon = ({ smp, geomCoords }) => {
  const mapGL = MapaInteractivoGL()

  const { edif, polygon } = getParcelLayer()

  useEffect(() => {
    mapGL.addVectorTileLayer(
      edif,
      null,
      false,
      null
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const parcel3D = mapGL.map.getLayer('edif_smp')
    if (parcel3D !== undefined) {
      mapGL.setFilter(
        'edif_smp',
        ['==', 'smp', smp.toLowerCase()] // smp.toUpperCase() '001-001-001A' '063-113-001A'
      )
    }
  }, [mapGL, smp])

  useEffect(() => {
    const layer = mapGL.map.getLayer(parcelId)
    if (layer !== undefined) {
      mapGL.map.removeLayer(parcelId)
    }

    if (geomCoords !== null) {
      const source = mapGL.map.getSource(smp)
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
        id: parcelId,
        source: smp,
        type: polygon.type,
        layout: polygon.layout,
        paint: polygon.paint
      })
      mapGL.map.moveLayer(parcelId, 'edif_smp')
    }
    // TODO: Agregar smp a las dependencias del useEffect sin perder funcionalidad
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geomCoords, mapGL])

  return null
}

export default Polygon
