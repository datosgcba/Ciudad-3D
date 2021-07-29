import { useState, useEffect } from 'react'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

import { lineString } from '@turf/helpers'
import length from '@turf/length'

const Lines = ({ points }) => {
  const { map } = MapaInteractivoGL()
  const [linesCoord, setLinesCoord] = useState([])

  useEffect(() => {
    if (points.length) {
      const aux = []
      points.reduce((a, b) => {
        aux.push([a, b])
        return b
      })
      setLinesCoord(aux)
    } else {
      setLinesCoord([])
    }
  }, [points])

  useEffect(() => {
    const geojson = {
      type: 'FeatureCollection',
      features: linesCoord.map((l) => ({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: l
        },
        properties: {
          distance: `${Math.round(length(lineString(l)) * 1000)}m`
        }
      }))
    }
    const source = map.getSource('linesComponent')
    if (source === undefined) {
      map.addSource('linesComponent', {
        type: 'geojson',
        data: geojson
      })
    }
    const layer = map.getLayer('measure-lines')
    if (layer === undefined) {
      map.addLayer({
        id: 'measure-lines',
        type: 'line',
        source: 'linesComponent',
        layout: {
          'line-cap': 'round',
          'line-join': 'round'
        },
        paint: {
          'line-color': 'rgba(255,211,6,0.5)',
          'line-width': 5
        }
      })
      map.addLayer({
        id: 'measure-symbols',
        type: 'symbol',
        source: 'linesComponent',
        layout: {
          'text-anchor': 'bottom',
          'text-allow-overlap': true,
          'symbol-placement': 'line-center',
          'text-font': ['Open Sans Regular'],
          'text-field': '{distance}', // part 2 of this is how to do it
          'text-size': 22
        },
        paint: {
          'text-color': '#FFD306',
          'text-halo-color': '#000000',
          'text-halo-width': 1
        }
      })
    }
    map.getSource('linesComponent').setData(geojson)
    return () => {
      map.removeLayer('measure-lines')
      map.removeLayer('measure-symbols')
    }
  }, [map, linesCoord])
  return null
}

export default Lines
