import React from 'react'

import PropTypes from 'prop-types'

import { Paper } from '@material-ui/core'

import Mapa from 'components/Mapa'
import Marker from 'components/Marker'
import Parcel from 'components/Parcel'
import Sections from 'components/Sections'
import SideBar from 'components/SideBar'

import { useSelector } from 'react-redux'

import 'mapbox-gl/dist/mapbox-gl.css'
import useStyles from './styles'

const Home = ({ token }) => {
  const classes = useStyles()

  const smp = useSelector((state) => state.basicData.data.smp)
  const place = useSelector((state) => state.seeker.place)

  return (
    <Paper className={classes.root}>
      <Sections />
      <SideBar />
      <Mapa logged={!!token}>
        <Parcel smp={smp} />
        {place && place.type !== 'CALLE' && <Marker place={place} />}
      </Mapa>
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
