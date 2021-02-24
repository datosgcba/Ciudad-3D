import React from 'react'
import { render } from 'react-dom'

import ReactGA from 'react-ga'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import theme from 'theme'

import { Provider } from 'react-redux'

import ReactFontLoader from 'react-font-loader'

import store from 'state'

import App from './App'

import * as serviceWorker from './serviceWorker'

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-190521771-1')
  ReactGA.pageview(window.location.pathname + window.location.search)
} else {
  // eslint-disable-next-line no-console
  console.warn(`Google Analytics was omitted.
    process.env.NODE_ENV: ${process.env.NODE_ENV}`)
}

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ReactFontLoader fonts={[{ name: 'Nunito' }, { name: 'Open Sans' }]} />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
