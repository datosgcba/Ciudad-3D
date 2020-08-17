import React, { useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server'

import { Container, Box } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'state/ducks/map'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

import Buscador from 'components/Buscador/Buscador'
import FeatureInfo from 'components/FeatureInfo/FeatureInfo'
// import LogoutButton from 'components/LogoutButton/LogoutButton'

import imgCapaBasePrincipal from 'img/capabase_1.png'
import imgCapaBaseSecundaria from 'img/capabase_2.png'

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
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security

linux:
google-chrome --disable-web-security

windows:
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp

*/
const transformRequest = (url, resourceType) => {
  const token = '7b3ea1f12563ee390a13ab885884e4590cf6de26'
  if (token === undefined) {
    console.log('Token is null')
  }
  if (resourceType === 'Tile' && url.endsWith('pbf')) {
    return {
      url,
      headers: { Authorization: `Token ${token}` }
      // credentials: 'include'  // Include cookies for cross-origin requests
    }
  }
}

const Mapa = ({ logged, updateMapAction, initMapAction }) => {
  const isMapReady = useSelector((state) => state.map.isMapReady)
  const [mapGL, setMapGL] = useState(null)
  const dispatch = useDispatch()
  const [capabasePrincipal, setCapabasePrincipal] = useState(true)

  const onFeatureClick = (mapInstance, lngLat, feature) => {
    mapInstance
      .getFeatureProps(feature.properties.Id)
      .then((res) => res.json())
      .then((data) => {
        const { contenido, direccionNormalizada } = data
        const featureInfoString = renderToString(<FeatureInfo contenido={contenido} direccionNormalizada={direccionNormalizada} />)
        mapInstance.addPopup(lngLat, featureInfoString)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (mapGL) {
      mapGL.toggleBaseLayer()
    }
  }, [capabasePrincipal])

  // Se inicializa el mapa
  useEffect(() => {
    if (!isMapReady) {
      const map = MapaInteractivoGL({
        onFeatureClick,
        transformRequest
      })
      setMapGL(map)

      dispatch(actions.initMap(map))
    }
  }, [isMapReady, dispatch])

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
        >
          <Box className={classes.minimapTitleContainer}>
            <Box className={classes.minimapTitle}>
              {capabasePrincipal ? 'Modo Oscuro' : 'Modo Claro'}
            </Box>
          </Box>
        </Box>
        <Box className={classes.topMenu}>
          <Buscador />
          {//logged ? <LogoutButton /> : null
          }
        </Box>
      </Box>
    </Container>
  )
}
export default Mapa
