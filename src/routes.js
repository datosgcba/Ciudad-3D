import React from "react";
import { Route , Switch} from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Home from "./containers/Home";



const BaseRouter = (props) => {
  const allowed = props.authed;

  return (
    <Hoc>
      <Switch>
        <Route path="/acceso" component={Login} />
        <Route exact path="/" component={Home} />
        <Route component={() => { window.location = 'https://site-error.buenosaires.gob.ar' }} />
      </Switch>


      {/* <Route exact path="/" render={() => (
        allowed ? (<Route path='/' component={Home} />)
          : (<Route path='/' component={Login} />)
      )} /> */}
    </Hoc>
  )

};

export default BaseRouter;
