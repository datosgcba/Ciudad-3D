import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import * as actions from "./store/actions/auth";
import Layout from "./containers/Layout";




class App extends Component {
  render() {

    return (
      <Router>
        <Layout {...this.props}>
          <BaseRouter authed={this.props.isAuthenticated} />
        </Layout>
      </Router>
    );
  }
}





export default App;
