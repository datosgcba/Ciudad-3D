import React from 'react'

import { Route, Switch } from 'react-router-dom'
import Fonts from 'containers/Fonts'
import Home from 'containers/Home'

const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/fonts" component={Fonts} />
    <Route component={() => { window.location = 'https://site-error.buenosaires.gob.ar' }} />
  </Switch>
)

export default BaseRouter
