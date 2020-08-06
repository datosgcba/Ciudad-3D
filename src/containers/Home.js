import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Hidden from "@material-ui/core/Hidden";
import Mapa from "../components/Mapa/Mapa";
import PanelLateral from "../components/PanelLateral/PanelLateral";
import NavBar from "../components/NavBar/NavBar";
import "mapbox-gl/dist/mapbox-gl.css";
import "../bastrap.css";
import "../App.css";
import Explorer from "../components/Sections/Explorer";

const drawerWidth = 100;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "auto",
    marginBottom: -10,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
    height: "110vh",
  },
  fixedHeight: {
    height: 290,
  },

  drawerPaper: {
    position: "relative",
    overflow: "auto",
    whiteSpace: "nowrap",
    height: "100vh",
    width: drawerWidth,
    color: "black",
    marginRight: 200,
    backgroundColor: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "hidden",
    zIndex: 1,
  },
}));

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

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Hidden mdUp implementation="css">
        <SwipeableDrawer
          id="mobile-drawer"
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          anchor="left"
          open={swipeOpen}
          onClose={handleDrawerToggle}
          onOpen={() => {
            /*no hace falta pero es requerido*/
          }}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <PanelLateral logged={props.token ? true : false} />
        </SwipeableDrawer>
      </Hidden>

      <Hidden smDown implementation="css">
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
      </Hidden>
      <Drawer
        variant="persistent"
        className={classes.drawerChartPanel}
        classes={{
          paper: classes.drawerChartPanelPaper,
        }}
        open={false}
      >
        <Explorer title="Explorar" />
      </Drawer>

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
