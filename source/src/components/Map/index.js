import React, { useEffect, useState, useCallback } from 'react'
import { renderToString } from 'react-dom/server'

import { Container, Box, Typography } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { actions as mapActions } from 'state/ducks/map'
import { actions as seekerActions } from 'state/ducks/seeker'

import { getApiUrl, getFullLayerConfigByIdLayer } from 'utils/configQueries'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

import Seeker from 'components/Seeker/Seeker'

import FeatureInfo from 'components/FeatureInfo/FeatureInfo'
import Measure from 'components/Measure'
import DimensionBtn from 'components/DimensionBtn'

import useFontsStyles from 'theme/fontsDecorators'

import imgCapaBasePrincipal from 'img/capabase_1.png'
import imgCapaBaseSecundaria from 'img/capabase_2.png'
import imgCapaBaseHistory from 'img/capabase_history.png'

import PropTypes from 'prop-types'
import useStyles from './styles'

const mockupHistory = [...new Array(10).keys()].map((v) => ({
  title: `${v + 1940}`,
  url: 'https://tiles.usig.org.ar/history/tiles/1940/{z}/{x}/{y}.pbf'
}))

const MinimapOption = ({ imageUrl, text, children, ...otherProps }) => {
  const classes = useStyles()
  const decorators = useFontsStyles()

  return (
    <>
      <Box
        className={classes.minimapLayer}
        style={{
          backgroundImage: imageUrl
        }}
        {...otherProps}
      >
        <Typography
          variant="caption"
          className={[
            decorators.bold,
            decorators.white,
            classes.minimapTitleContainer
          ]}
        >
          {text}
        </Typography>
      </Box>
      {children}
    </>
  )
}
// background-color: rgba(0, 0, 0, 0.5);
//     color: white;
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
  const [bottomMenuVisible, setBottomMenuVisible] = useState(false)
  const [historyMenu, setHistoryMenuVisible] = useState(false)

  const dispatch = useDispatch()
  const [capabasePrincipal, setCapabasePrincipal] = useState(true)

  useEffect(() => {
    if (isMapReady && cameraLat) {
      mapGL.map.flyTo({
        center: [cameraLng, cameraLat],
        zoom: cameraZoom,
        pitch: cameraPitch,
        bearing: cameraBearing
      })
    } else if (isMapReady) {
      mapGL.map.flyTo({
        pitch: cameraPitch
      })
    }
  }, [
    isMapReady,
    mapGL,
    cameraLat,
    cameraLng,
    cameraZoom,
    cameraBearing,
    cameraPitch
  ])

  const onFeatureClick = (mapInstance, lngLat, feature) => {
    const {
      properties: { Id: featId },
      layer: { id: idLayer }
    } = feature

    const fields = JSON.parse(getFullLayerConfigByIdLayer(idLayer).popupContent)

    mapInstance
      .getFeatureProps(featId, fields)
      .then((res) => res.json())
      .then((data) => {
        const { contenido, direccionNormalizada } = data

        const contenidoMostrar =
          fields?.length > 0
            ? contenido.filter(({ nombreId }) => fields.includes(nombreId))
            : contenido

        const featureInfoString = renderToString(
          <FeatureInfo
            contenido={contenidoMostrar}
            direccionNormalizada={direccionNormalizada}
          />
        )
        mapInstance.addPopup(lngLat, featureInfoString)
      })
  }

  const onClicked = useCallback(
    ({ lng, lat }) => {
      const coord = { lng, lat }
      dispatch(mapActions.clickOnMap(coord))
    },
    [dispatch]
  )

  useEffect(() => {
    if (
      isMapReady &&
      mapGL.isVisibleBaseLayerPrincipal() === capabasePrincipal
    ) {
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
          dispatch(
            mapActions.cameraUpdated({
              lat,
              lng,
              zoom,
              bearing,
              pitch
            })
          )
        },
        apiUrl: getApiUrl()
      })
      setMapGL(map)

      const engine = map.getMapEngine()
      const control = new engine.NavigationControl()
      map.map.addControl(control)
      dispatch(mapActions.initMap(map))
    }
  }, [
    isMapReady,
    defaultMapStyle,
    cameraLat,
    cameraLng,
    cameraZoom,
    onClicked,
    dispatch
  ])

  const classes = useStyles()

  const handlerBottomMenuEnter = () => {
    setBottomMenuVisible(true)
  }

  const handlerBottomMenuLeave = () => {
    setBottomMenuVisible(false)
    setHistoryMenuVisible(false)
  }

  const handlerHistoryMenuEnter = () => {
    setHistoryMenuVisible(true)
  }

  const handlerHistoryMenuLeave = () => {
    setHistoryMenuVisible(false)
  }

  return (
    <>
      <Container id="map" className={classes.container}>
        <Box
          className={classes.bottomMenu}
          //onMouseEnter={handlerBottomMenuEnter}
          onMouseLeave={handlerBottomMenuLeave}
        >
          <MinimapOption
            imageUrl={`url(${capabasePrincipal ? imgCapaBasePrincipal : imgCapaBaseSecundaria })`}
            onClick={() => setCapabasePrincipal(!capabasePrincipal)}
            text={'MAPA'}
          />
          {bottomMenuVisible && (
            <>
              <MinimapOption
                imageUrl={`url(${imgCapaBaseSecundaria})`}
                onClick={() => setCapabasePrincipal(capabasePrincipal)}
                text={'AEREA'}
              />
              <MinimapOption
                imageUrl={`url(${imgCapaBaseHistory})`}
                onClick={() => setCapabasePrincipal(!capabasePrincipal)}
                text={'HISTÓRICA'}
                onMouseEnter={handlerHistoryMenuEnter}
                onMouseLeave={handlerHistoryMenuLeave}
              >
                <Box
                  className={classes.historyMenu}
                  style={{
                    top: mockupHistory.length * -35 + 5
                  }}
                  onMouseEnter={handlerHistoryMenuEnter}
                  onMouseLeave={handlerHistoryMenuLeave}
                >
                  {historyMenu && mockupHistory?.length
                    ? mockupHistory.map(({ title }) => (
                        <Typography
                          variant="caption"
                          className={classes.historyTitle}
                        >
                          {title}
                        </Typography>
                      ))
                    : null}
                </Box>
              </MinimapOption>
            </>
          )}
        </Box>
        <Measure />
        <DimensionBtn />
        {isMapReady && children}
      </Container>
      <Box className={classes.topMenu}>
        <Seeker
          onSelectItem={(selectedSuggestion) => {
            dispatch(seekerActions.placeSelected({ data: { smp: null } }))
            dispatch(seekerActions.placeSelected(selectedSuggestion))
            dispatch(
              seekerActions.coordinatesSelected(
                selectedSuggestion.data.coordenadas
              )
            )
            /*
            Se actualiza la camara desde acá
            ya que al elegir lugares o intersecciones
            el autocompleter no trae SMP
           */
            if (
              (selectedSuggestion.data.smp === undefined ||
                selectedSuggestion.data.smp === '') &&
              selectedSuggestion.data.coordenadas &&
              selectedSuggestion.data.coordenadas.x &&
              selectedSuggestion.data.coordenadas.y
            ) {
              dispatch(
                mapActions.cameraUpdated({
                  lat: selectedSuggestion.data.coordenadas.y,
                  lng: selectedSuggestion.data.coordenadas.x,
                  zoom: 17,
                  pitch: 60,
                  bearing: 0
                })
              )
            }
          }}
        />
      </Box>
    </>
  )
}

Map.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default Map
