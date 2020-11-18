import React, { useEffect, useState, useCallback } from 'react'
import { renderToString } from 'react-dom/server'

import { Container, Box } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { actions as mapActions } from 'state/ducks/map'
import { actions as seekerActions } from 'state/ducks/seeker'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

import Seeker from 'components/Seeker/Seeker'

import FeatureInfo from 'components/FeatureInfo/FeatureInfo'
// import LogoutButton from 'components/LogoutButton/LogoutButton'

import imgCapaBasePrincipal from 'img/capabase_1.png'
import imgCapaBaseSecundaria from 'img/capabase_2.png'

import PropTypes from 'prop-types'
import useStyles from './styles'

// TODO: !Revisar el tema del token
/*
Por ahora para usar ingresar obtener el token y setear en local storage
curl 'http://seguridad.eastus2.cloudapp.azure.com/rest-auth/login/' \
  -H 'Content-Type: application/json;charset=UTF-8' \
  --data-binary '{"username":"admin","password":"adminusig1234"}'

El token setearlo así. Pero ahora siempre retorna el mismo valor
localStorage.setItem("token", '7b3ea1f12563ee390a13ab885884e4590cf6de26')

Iniciar el navegador sin cors
osx:
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
--args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

linux:
google-chrome --disable-web-security

windows:
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
--disable-web-security --disable-gpu --user-data-dir=~/chromeTemp

*/
const transformRequest = (url, resourceType) => {
  const token = '7b3ea1f12563ee390a13ab885884e4590cf6de26'
  if (resourceType === 'Tile' && url.endsWith('pbf')) {
    return {
      url,
      headers: { Authorization: `Token ${token}` }
      // credentials: 'include'  // Include cookies for cross-origin requests
    }
  }
  return { url }
}

const Map = ({ children }) => {
  const isMapReady = useSelector((state) => state.map.isMapReady)
  const cameraLat = useSelector((state) => state.map.camera.lat)
  const cameraLng = useSelector((state) => state.map.camera.lng)
  const cameraZoom = useSelector((state) => state.map.camera.zoom)
  const cameraPitch = useSelector((state) => state.map.camera.pitch)
  const cameraBearing = useSelector((state) => state.map.camera.bearing)
  const [mapGL, setMapGL] = useState(null)
  const dispatch = useDispatch()
  const [capabasePrincipal, setCapabasePrincipal] = useState(true)

  useEffect(() => {
    if (isMapReady) {
      mapGL.map.flyTo({
        center: [cameraLng, cameraLat], zoom: cameraZoom, pitch: cameraPitch, bearing: cameraBearing
      })
    }
  }, [isMapReady, mapGL, cameraLat, cameraLng, cameraZoom, cameraBearing, cameraPitch])

  const onFeatureClick = (mapInstance, lngLat, feature) => {
    mapInstance
      .getFeatureProps(feature.properties.Id)
      .then((res) => res.json())
      .then((data) => {
        const { contenido, direccionNormalizada } = data
        // eslint-disable-next-line max-len
        const featureInfoString = renderToString(<FeatureInfo contenido={contenido} direccionNormalizada={direccionNormalizada} />)
        mapInstance.addPopup(lngLat, featureInfoString)
      })
  }

  const onClicked = useCallback(({ lng, lat }) => {
    const coord = { lng, lat }
    dispatch(mapActions.clickOnMap(coord))
  }, [dispatch])

  useEffect(() => {
    if (isMapReady && mapGL.isVisibleBaseLayerPrincipal() === capabasePrincipal) {
      mapGL.toggleBaseLayer()
    }
  }, [capabasePrincipal, mapGL, isMapReady])

  // Se inicializa el mapa
  useEffect(() => {
    if (!isMapReady) {
      const map = MapaInteractivoGL({
        params: {
          center: [cameraLng, cameraLat],
          zoom: cameraZoom
        },
        onFeatureClick,
        transformRequest,
        onClicked
      })
      setMapGL(map)

      dispatch(mapActions.initMap(map))
    }
  }, [isMapReady, cameraLat, cameraLng, cameraZoom, onClicked, dispatch])

  const classes = useStyles()
  return (
    <Container id="map" className={classes.container}>
      <Box className={classes.bottomMenu}>
        <Box
          className={classes.minimapLayer}
          style={{
            backgroundImage: capabasePrincipal
              ? `url(${imgCapaBasePrincipal})`
              : `url(${imgCapaBaseSecundaria})`
          }}
          onClick={() => setCapabasePrincipal(!capabasePrincipal)}
        />
        <Box className={classes.topMenu}>
          <Seeker onSelectItem={(selectedSuggestion) => {
            dispatch(seekerActions.placeSelected(selectedSuggestion))
            dispatch(seekerActions.coordinatesSelected(selectedSuggestion.data.coordenadas))
            /*
              Se actualiza la camara desde acá
              ya que al elegir lugares el autocompleter no trae SMP
             */
            if (
              selectedSuggestion.data.smp === undefined
              && selectedSuggestion.data.coordenadas
              && selectedSuggestion.data.coordenadas.x && selectedSuggestion.data.coordenadas.y
            ) {
              dispatch(mapActions.cameraUpdated({
                lat: selectedSuggestion.data.coordenadas.y,
                lng: selectedSuggestion.data.coordenadas.x,
                zoom: 17,
                pitch: 60,
                bearing: 0
              }))
            }
          }}
          />
          {// logged ? <LogoutButton /> : null
          }
        </Box>
      </Box>
      {isMapReady && children }
    </Container>
  )
}

Map.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default Map
