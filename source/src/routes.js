import React from 'react'

import { Route, Switch } from 'react-router-dom'
import Home from 'containers/Home'

const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route component={() => { window.location = 'https://www.buenosaires.gob.ar/noexiste.html' }} />
  </Switch>
)

export default BaseRouter
