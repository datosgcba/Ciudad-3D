import { useEffect } from 'react'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

const Polygon = ({ smp, geomCoords }) => {
  const mapGL = MapaInteractivoGL()

  useEffect(() => {
    const layer = mapGL.map.getLayer('Parcel')
    if (layer !== undefined) {
      mapGL.map.removeLayer('Parcel')
    }

    if (geomCoords !== null && smp !== null) {
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
  // TODO: Agregar smp a las variables del useEffect sin perder funcionalidad
  }, [geomCoords])

  return null
}

export default Polygon
