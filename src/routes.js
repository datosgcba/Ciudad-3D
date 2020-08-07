import React from "react";
import { Route , Switch } from "react-router-dom";
import Home from "containers/Home";

const BaseRouter = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={() => { window.location = 'https://site-error.buenosaires.gob.ar' }} />
    </Switch>
  )
};

export default BaseRouter;
