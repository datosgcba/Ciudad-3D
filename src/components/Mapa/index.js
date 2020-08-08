import React, { useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server'

import { Container, Box } from '@material-ui/core'

import { initMap, updateMap } from 'store/actions'
import { useDispatch, useSelector } from 'react-redux'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

import Buscador from 'components/Buscador/Buscador'
import FeatureInfo from 'components/FeatureInfo/FeatureInfo'
import LogoutButton from 'components/LogoutButton/LogoutButton'

import imgCapaBasePrincipal from 'img/capabase_1.png'
import imgCapaBaseSecundaria from 'img/capabase_2.png'

import useStyles from './styles'

const Mapa = ({ logged, updateMapAction, initMapAction }) => {
  const map = useSelector((state) => state.map.mapaGL)
  const dispatch = useDispatch()
  const [capabasePrincipal, setCapabasePrincipal] = useState(true)

  const onFeatureClick = (lngLat, feature) => {
    map
      .getFeatureProps(feature.properties.Id)
      .then((res) => res.json())
      .then((props) => {
        const contenido = renderToString(<FeatureInfo props={props} />)
        map.addPopup(lngLat, contenido)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (map) {
      map.toggleBaseLayer()
    }
  }, [capabasePrincipal])

  useEffect(() => {
    if (!map) {
      const instanciaMap = new MapaInteractivoGL({
        onFeatureClick,
      })

      // dispatch de la accion para guardar la instancia en el store
      dispatch(updateMap(instanciaMap))

      // agrego las capas prendidas por default
      dispatch(initMap())
    }
  }, [map, dispatch])

  const classes = useStyles()
  return (
    <Container id="map" className={classes.container}>
      <div className={classes.topMenu}>
        <Buscador />
        {logged ? <LogoutButton /> : null}
      </div>
      <Box onClick={() => setCapabasePrincipal(!capabasePrincipal)} className={classes.bottomMenu}>
        <div
          className={classes.minimapLayer}
          style={{
            backgroundImage: !capabasePrincipal
              ? `url(${imgCapaBasePrincipal})`
              : `url(${imgCapaBaseSecundaria})`,
          }}
        >
          <div className={classes.minimapTitleContainer}>
            <div className={classes.minimapTitle}>
              {!capabasePrincipal ? 'Modo Oscuro' : 'Modo Claro'}
            </div>
          </div>
        </div>
      </Box>
    </Container>
  )
}
export default Mapa
