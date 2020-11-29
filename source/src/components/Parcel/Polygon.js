/* eslint-disable */
import { useEffect } from 'react'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

const parcelId = 'parcel_layer'
const Polygon = ({ smp, geomCoords }) => {
  const mapGL = MapaInteractivoGL()

  useEffect(() => {
    mapGL.addVectorTileLayer(
      {
        id: `edif_smp`,
        "source": {
          "type": "vector",
          "tiles": [
            "http://vectortiles.usig.buenosaires.gob.ar/cur3d/volumen_edif/{z}/{x}/{y}.pbf?optimize=true"
          ],
          "minzoom": 10,
          "maxzoom": 18,
          "cluster": false
        },
        "source-layer": "default",
        "type": "fill-extrusion",
        "paint": {
          "fill-extrusion-color": "#fdd306",
          "fill-extrusion-opacity": 0.9,
          "fill-extrusion-height": ["get", "altura_final"]
        },
        "filter": ["==", "smp", "no-match"]
      },
      null,
      false,
      null
    )
  }, [])

  useEffect(() => {
    const parcel3D = mapGL.map.getLayer('edif_smp')
    if (parcel3D !== undefined) {
      mapGL.setFilter(
        'edif_smp',
        ["==", "smp", smp.toLowerCase()]//smp.toUpperCase() '001-001-001A' '063-113-001A'
      )
    }
  }, [smp])

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
        type: 'fill',
        source: smp,
        layout: {},
        paint: {
          'fill-color': 'khaki',
          'fill-outline-color': 'khaki',
          'fill-opacity': 0.5
        }
      })
      mapGL.map.moveLayer(parcelId, 'edif_smp')
    }
    // TODO: Agregar smp a las dependencias del useEffect sin perder funcionalidad
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geomCoords, mapGL])

  return null
}

export default Polygon
