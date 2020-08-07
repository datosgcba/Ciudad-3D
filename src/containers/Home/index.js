import { Drawer, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Mapa from 'components/Mapa/Mapa'
import PanelLateral from 'components/PanelLateral/PanelLateral'
import Section from 'components/Sections'
import PropTypes from 'prop-types'
import axios from 'axios'
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
      <Paper>
        <Section />
      </Paper>
      <Drawer
        id="desktop-drawer"
        variant="persistent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open
      >
        <PanelLateral />
      </Drawer>

      <Mapa data={data} logged={!!token} />
    </Paper>
  )
}

Home.propTypes = {
  token: PropTypes.string.isRequired,
}

export default Home
