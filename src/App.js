import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";
import Layout from "./containers/Layout";


const App = (props) => <Router>
  <BaseRouter authed={props.isAuthenticated} />
</Router>





export default App;
