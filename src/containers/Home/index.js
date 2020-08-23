import React from 'react'

import PropTypes from 'prop-types'

import { Paper } from '@material-ui/core'

import Mapa from 'components/Mapa'
import Sections from 'components/Sections'
import SideBar from 'components/SideBar'

import 'mapbox-gl/dist/mapbox-gl.css'
import useStyles from './styles'

const Home = ({ token }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Sections />
      <SideBar />
      <Mapa logged={!!token} />
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
