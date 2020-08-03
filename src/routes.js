import React from "react";
import { Route , Switch} from "react-router-dom";
import Hoc from "./hoc/hoc";

import Home from "./containers/Home";



const BaseRouter = (props) => {
  return (
    <Hoc>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={() => { window.location = 'https://site-error.buenosaires.gob.ar' }} />
      </Switch>
    </Hoc>
  )

};

export default BaseRouter;
