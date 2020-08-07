import { Drawer, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Explorer from 'components/Sections/Explorer'
import Mapa from 'components/Mapa/Mapa'
import PanelLateral from 'components/PanelLateral/PanelLateral'
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

  const sectionsOption = {
    Explorer,
  }
  const sectionName = 'Explorer'
  const Section = sectionsOption[sectionName] // <Explorer title="Explorar" />
  return (
    <Paper className={classes.root}>
      <Drawer
        id="desktop-drawer"
        variant="persistent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open
      >
        <PanelLateral logged={!!token} />
      </Drawer>
      <Paper variant="persistent">
        <Section title="Explorar" />
      </Paper>

      <Mapa data={data} logged={!!token} />
    </Paper>
  )
}

Home.propTypes = {
  token: PropTypes.string.isRequired,
}

export default Home
