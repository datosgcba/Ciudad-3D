import React from "react";

import {  withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import './Layout.css';

class CustomLayout extends React.Component {
  render() {
    return this.props.children;
  }
}



export default withRouter(
  CustomLayout
);
