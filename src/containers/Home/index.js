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

  const place = useSelector((state) => state.seeker.place)
  const mapCoords = useSelector((state) => state.map.selectedCoords)

  return (
    <Paper className={classes.root}>
      <Sections />
      <SideBar />
      <Map logged={!!token}>
        <Parcel />
        {mapCoords && <Marker place={place} />}
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
