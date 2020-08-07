import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
import { Paper, Drawer } from "@material-ui/core"
import PanelLateral from "components/PanelLateral"
import Mapa from "components/Mapa/Mapa"
import "mapbox-gl/dist/mapbox-gl.css"
import "bastrap.css"
import "App.css"
import useStyles from "./styles"
import Section from 'components/Sections'

const Home = (props) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://ws.usig.buenosaires.gob.ar/rest/normalizar_direcciones?calle=sarmiento&altura=500&desambiguar=1"
      );
      setData(result.data);
    }
    fetchData()
  }, [])

  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Drawer
        id="desktop-drawer"
        variant="persistent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={true}
      >
        <PanelLateral />
      </Drawer>
      <Paper >
        <Section />
      </Paper>

      <Mapa data={data} logged={props.token ? true : false} />
    </Paper>
  );
};

export default Home;
