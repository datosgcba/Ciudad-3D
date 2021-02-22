import React from 'react'

import PropTypes from 'prop-types'

import { Paper } from '@material-ui/core'

import Map from 'components/Map'
import Marker from 'components/Marker'
import Parcel from 'components/Parcel'
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

  return (
    <Paper className={classes.root}>
      <Sections />
      <SideBar />
      <Map logged={!!token}>
        <Parcel />
        {placeLat && placeLng && (
          <>
            <Marker
              coords={{ lat: placeLat, lng: placeLng }}
            />
          </>
        )}
      </Map>
    </Paper>
  )
}
Home.propTypes = {
  token: PropTypes.string
}
Home.defaultProps = {
  token: null
}

export default Home
