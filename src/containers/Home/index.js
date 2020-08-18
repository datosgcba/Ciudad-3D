import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Paper } from '@material-ui/core'

import axios from 'axios'

import Mapa from 'components/Mapa'
import Sections from 'components/Sections'
import SideBar from 'components/SideBar'

import 'mapbox-gl/dist/mapbox-gl.css'
import useStyles from './styles'

const Home = ({ token }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://ws.usig.buenosaires.gob.ar/rest/normalizar_direcciones?calle=sarmiento&altura=500&desambiguar=1'
      )
      setData(result.data)
    }
    fetchData()
  }, [])

  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Sections />
      <SideBar />
      <Mapa data={data} logged={!!token} />
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
