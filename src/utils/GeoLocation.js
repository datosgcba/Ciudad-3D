import fetchJsonp from 'fetch-jsonp'

import Coords from './coordinates'

const prettifyDirection = (direction) => {
  const name = direction.tipo === 'calle_y_calle' ? `${direction.nombre_calle} y ${direction.nombre_calle_cruce}` : direction.direccion
  const lowerName = name ? name.split(' ').map((word) => (word.length === 1 ? word.toLowerCase() : word[0] + word.substr(1, word.length).toLowerCase())).join(' ') : undefined
  return lowerName ? {
    direccion: { ...direction, coordenadas: direction.coordenadas },
    type: 'COORDENADAS',
    alias: lowerName,
    nombre: lowerName,
    descripcion: direction.nombre_partido === 'CABA' ? 'Ciudad Autónoma de Buenos Aires' : `${direction.nombre_localidad}, ${direction.nombre_partido}`
  } : direction
}

function reverseGeolocation(coordenadas) {
  const contentUrl = `https://servicios.usig.buenosaires.gob.ar/normalizar/?lng=${coordenadas[0]
  || coordenadas.x}&lat=${coordenadas[1] || coordenadas.y}&minusculas=1`
  return fetch(contentUrl).then(
    (response) => response.json()
  ).then((direction) => prettifyDirection(direction))
}

// The getObjectContent API returns a POINT string with the coordinates in it.
const getCoordinatesFromPoint = (pointString) => {
  const parenthesisSplit = pointString.split('(')[1].split(')')[0].split(' ')
  return {
    x: parseFloat(parenthesisSplit[0]),
    y: parseFloat(parenthesisSplit[1])
  }
}

function fetchGeolocation(lugar) {
  /* TODO */
  // console.log('PASA POR GEOLOCATION')
  const contentPlaceUrl = `https://epok.buenosaires.gob.ar/getObjectContent/?id=${lugar.idEpok}&srid=4326`
  const contentUrlDirection = lugar.data.calleCruce ? `https://ws.usig.buenosaires.gob.ar/geocoder/2.2/geocoding/?cod_calle1=${lugar.data.calle.cod_calle || lugar.data.calle.codigo}&cod_calle2=${lugar.data.calleCruce.cod_calle || lugar.data.calleCruce.codigo}`
    : `https://ws.usig.buenosaires.gob.ar/geocoder/2.2/geocoding/?cod_calle=${lugar.data.calle.cod_calle || lugar.data.calle.codigo}&altura=${lugar.data.altura}`
  const contentUrl = `https://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${lugar.nombre}&geocodificar=true&srid=4326`

  switch (lugar.type) {
    case 'LUGAR':
      return fetch(contentPlaceUrl)
        .then((response) => response.json())
        .then((json) => getCoordinatesFromPoint(json.ubicacion.centroide))
    case 'DIRECCION':
      // if (!lugar.direccion || !lugar.direccion.calle) return;
      if (lugar.data.descripcion === 'Ciudad Autónoma de Buenos Aires') {
        return fetchJsonp(contentUrlDirection)
          .then((response) => response.json())
          .then((json) => Coords.toLngLat(json, true))
      }
      return fetch(contentUrl)
        .then((response) => response.json())
        .then((json) => {
          const calleNormalizada = json.direccionesNormalizadas.filter(
            (calle) => calle.cod_calle === lugar.data.calle.cod_calle
            || calle.cod_calle === lugar.data.calle.codigo
          )[0]
          if (calleNormalizada && calleNormalizada.coordenadas) {
            return {
              x: parseFloat(calleNormalizada.coordenadas.x),
              y: parseFloat(calleNormalizada.coordenadas.y)
            }
          }
          return null
        })
    default:
  }
  return null
}

const Geocoder = {
  fetchGeolocation,
  reverseGeolocation
}

export default Geocoder
