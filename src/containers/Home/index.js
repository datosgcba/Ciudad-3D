import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Drawer, Paper, Box, Container, AppBar, Typography} from '@material-ui/core'

import axios from 'axios'

import Mapa from 'components/Mapa'
import Sections from 'components/Sections'
import SideBar from 'components/SideBar'


import useStyles from './styles'

const Home = ({ token }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://ws.usig.buenosaires.gob.ar/rest/normalizar_direcciones?calle=sarmiento&altura=500&desambiguar=1',
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
      {
        /*
      <AppBar style={{height:'50vh'}}><Paper><Box><Typography>dfsdfdfdsfdsafdasfasf</Typography></Box></Paper></AppBar>
      <Container style={{height:'90vh', backgroundColor:'#88dd88'}}><Paper><Typography>dfsdfdfdsfdsafdasfasf</Typography></Paper>Empty</Container>
      */
      }
    </Paper>
  )
}

Home.propTypes = {
  token: PropTypes.string.isRequired,
}

export default Home
