/* eslint-disable */
import { BrowserRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import Routes from './routes'

import Tour from 'reactour'

import { largeScreenSteps } from './steps'

const App = ({ isAuthenticated }) => (
  <BrowserRouter>
    <Routes authed={isAuthenticated} />
  </BrowserRouter>
)

App.propTypes = {
  isAuthenticated: PropTypes.bool
}
App.defaultProps = {
  isAuthenticated: false
}

export default App
