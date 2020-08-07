import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import axios from 'axios'

import { connect } from "react-redux";

import Drawer from "@material-ui/core/Drawer";
import Paper from "@material-ui/core/Paper";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Hidden from "@material-ui/core/Hidden";
import Mapa from "components/Mapa/Mapa";
import PanelLateral from "components/PanelLateral/PanelLateral";
import NavBar from "components/NavBar/NavBar";
import "mapbox-gl/dist/mapbox-gl.css";
import "bastrap.css";
import "App.css";
import Explorer from "components/Sections/Explorer";
import config from "config";
import useStyles from "./styles";

const Home = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://ws.usig.buenosaires.gob.ar/rest/normalizar_direcciones?calle=sarmiento&altura=500&desambiguar=1"
      );
      setData(result.data);
    }
    fetchData();
  }, []);

  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [swipeOpen, setSwipeOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setSwipeOpen(!swipeOpen);
  };

  const sectionsOption = {
    Explorer
  }
  const sectionName = 'Explorer'
  const Section = sectionsOption[sectionName] //<Explorer title="Explorar" />
  return (
    <div className={classes.root}>
      <Drawer
        id="desktop-drawer"
        variant="persistent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={true}
      >
        <PanelLateral logged={props.token ? true : false} />
      </Drawer>
      <Paper
        variant="persistent"
        className={classes.drawerChartPanel}
        classes={{
          paper: classes.drawerChartPanelPaper,
        }}
      >
        <Section title="Explorar"/>
      </Paper>

      <main className={classes.content}>
        {/* navBar para mobile*/}
        <Hidden mdUp implementation="css">
          <NavBar isMobile handleDrawerToggle={handleDrawerToggle} />
        </Hidden>

        <Mapa data={data} logged={props.token ? true : false} />
      </main>
    </div>
  );
};

export default Home;
