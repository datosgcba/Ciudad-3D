import React, { useEffect, useState, useCallback } from 'react'
import { renderToString } from 'react-dom/server'

import { Container, Box } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { actions as mapActions } from 'state/ducks/map'
import { actions as seekerActions } from 'state/ducks/seeker'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

import Seeker from 'components/Seeker/Seeker'

import FeatureInfo from 'components/FeatureInfo/FeatureInfo'
import Measure from 'components/Measure'
import DimensionBtn from 'components/DimensionBtn'
import imgCapaBasePrincipal from 'img/capabase_1.png'
import imgCapaBaseSecundaria from 'img/capabase_2.png'

import PropTypes from 'prop-types'
import useStyles from './styles'

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
  const cameraLat = useSelector((state) => state.map.camera?.lat)
  const cameraLng = useSelector((state) => state.map.camera?.lng)
  const cameraZoom = useSelector((state) => state.map.camera?.zoom)
  const cameraPitch = useSelector((state) => state.map.camera?.pitch)
  const cameraBearing = useSelector((state) => state.map.camera?.bearing)
  const [mapGL, setMapGL] = useState(null)
  const dispatch = useDispatch()
  const [capabasePrincipal, setCapabasePrincipal] = useState(true)

  useEffect(() => {
    if (isMapReady && cameraLat) {
      mapGL.map.flyTo({
        center: [cameraLng, cameraLat], zoom: cameraZoom, pitch: cameraPitch, bearing: cameraBearing
      })
    } else if (isMapReady) {
      mapGL.map.flyTo({
        pitch: cameraPitch
      })
    }
  }, [isMapReady, mapGL, cameraLat, cameraLng, cameraZoom, cameraBearing, cameraPitch])

  const onFeatureClick = (mapInstance, lngLat, feature) => {
    mapInstance
      .getFeatureProps(feature.properties.Id)
      .then((res) => res.json())
      .then((data) => {
        const { contenido, direccionNormalizada } = data
        const featureInfoString = renderToString(
          <FeatureInfo contenido={contenido} direccionNormalizada={direccionNormalizada} />
        )
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

  const defaultMapStyle = useSelector((state) => state.map.defaultMapStyle)

  useEffect(() => {
    dispatch(mapActions.loadLayers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Se inicializa el mapa
  useEffect(() => {
    if (!isMapReady && defaultMapStyle !== null && cameraLat) {
      const map = MapaInteractivoGL({
        params: {
          center: [cameraLng, cameraLat],
          zoom: cameraZoom,
          style: defaultMapStyle
        },
        onFeatureClick,
        transformRequest,
        onClicked,
        onMoveEnd: () => {
          const { lng, lat } = map.map.getCenter()
          const bearing = map.map.getBearing()
          const pitch = map.map.getPitch()
          const zoom = map.map.getZoom()
          dispatch(mapActions.cameraUpdated({
            lat,
            lng,
            zoom,
            bearing,
            pitch
          }))
        }
      })
      setMapGL(map)

      const engine = map.getMapEngine()
      const control = new engine.NavigationControl()
      map.map.addControl(control)
      dispatch(mapActions.initMap(map))
    }
  }, [isMapReady, defaultMapStyle, cameraLat, cameraLng, cameraZoom, onClicked, dispatch])

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
            dispatch(seekerActions.placeSelected({ data: { smp: null } }))
            dispatch(seekerActions.placeSelected(selectedSuggestion))
            dispatch(seekerActions.coordinatesSelected(selectedSuggestion.data.coordenadas))
            /*
            Se actualiza la camara desde acá
            ya que al elegir lugares o intersecciones
            el autocompleter no trae SMP
           */
            if (
              (selectedSuggestion.data.smp === undefined
                || selectedSuggestion.data.smp === '')
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
        </Box>
        <Measure />
        <DimensionBtn />
      </Box>
      {isMapReady && children}
    </Container>
  )
}

Map.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default Map
