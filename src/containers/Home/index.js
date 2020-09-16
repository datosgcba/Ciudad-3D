import React from 'react'

import PropTypes from 'prop-types'

import { Paper } from '@material-ui/core'

import Map from 'components/Map'
import Marker from 'components/Marker'
import Parcel from 'components/Parcel'
import Popup from 'components/Popup'
import Sections from 'components/Sections'
import SideBar from 'components/SideBar'

import { useSelector } from 'react-redux'

import 'mapbox-gl/dist/mapbox-gl.css'
import useStyles from './styles'

const Home = ({ token }) => {
  const classes = useStyles()

  const placeLat = useSelector(
    (state) => state.seeker.place
      && state.seeker.place.data
      && state.seeker.place.data.coordenadas
      && state.seeker.place.data.coordenadas.y
  )
  const placeLng = useSelector(
    (state) => state.seeker.place
      && state.seeker.place.data
      && state.seeker.place.data.coordenadas
      && state.seeker.place.data.coordenadas.x
  )

  const selectedCoords = useSelector(
    (state) => state.map && state.map.selectedCoords
  )

  const smpBasicData = useSelector((state) => state.basicData.data.smp)
  return (
    <Paper className={classes.root}>
      <Sections />
      <SideBar />
      <Map logged={!!token}>
        <Parcel />
        {smpBasicData && selectedCoords && (
          <Popup coords={selectedCoords}>
            <h1>Soy un popup</h1>
          </Popup>
        )}
        {placeLat && placeLng && (
          <>
            <Marker
              coords={{ lat: placeLat, lng: placeLng }}
            />
            <Popup coords={{ lat: placeLat, lng: placeLng }}>
              <h1>Dirección</h1>
            </Popup>
          </>
        )}
      </Map>
    </Paper>
  )
}
// <Mapa data={data} logged={!!token} />
Home.propTypes = {
  token: PropTypes.string
}
Home.defaultProps = {
  token: null
}

export default Home
