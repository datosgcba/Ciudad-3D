import React from "react";
import Logo from "../Logo/Logo";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from '@material-ui/core/IconButton';
import Toolbar from "@material-ui/core/Toolbar";
import "./style.css";

const navBar = props => {
  return props.isMobile ? (
    <AppBar position="static" className="header-marca" style={{ position: 'absolute' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="mostrar menú"
          edge="start"
          onClick={props.handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <h1 className="header-title">COVID-19 | Mapa</h1>
        <Logo isMobile w={55} h={45} />
      </Toolbar>
    </AppBar>
  ) : (
      <AppBar position="static" className="header-marca">
        <div className="">
          <div className="" style={{ display: "flex" }}>
            <Logo w={110} h={90} />
            <h1 className="header-title">COVID-19 | Mapa</h1>
          </div>
        </div>
      </AppBar>
    );
};

export default navBar;
