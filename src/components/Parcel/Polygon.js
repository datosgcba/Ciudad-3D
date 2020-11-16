/* eslint-disable */
import { useEffect } from 'react'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

const Polygon = ({ smp, geomCoords }) => {
  const mapGL = MapaInteractivoGL()

  useEffect(() => {
    mapGL.addVectorTileLayer(
      {
        id: `edif_smp`,
        "source": {
          "type": "vector",
          "tiles": [
            "http://cur3d.eastus2.cloudapp.azure.com:8080/cur3d/volumen_edif/{z}/{x}/{y}.pbf"
          ],
          "minzoom": 10,
          "maxzoom": 18,
          "cluster": false
        },
        "source-layer": "default",
        "type": "fill-extrusion",
        "paint": {
          "fill-extrusion-color": "#DD0083",
          "fill-extrusion-opacity": 0.8,
          "fill-extrusion-height": [ "get", "altura_final" ]
        },
        "filter": [ "==", "smp", smp ]
      },
      null,
      false,
      null
    )

    const layer = mapGL.map.getLayer('Parcel')
    if (layer !== undefined) {
      mapGL.map.removeLayer('Parcel')
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
  // TODO: Agregar smp a las dependencias del useEffect sin perder funcionalidad
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geomCoords, mapGL])

  return null
}

export default Polygon
