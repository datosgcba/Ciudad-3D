import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "routes";

const App = (props) => <Router>
  <BaseRouter authed={props.isAuthenticated} />
</Router>

export default App;
