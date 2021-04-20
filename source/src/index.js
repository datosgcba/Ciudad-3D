import React from 'react'
import { render } from 'react-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import theme from 'theme'

import { Provider } from 'react-redux'

import ReactFontLoader from 'react-font-loader'

import store from 'state'

import App from './App'

import * as serviceWorker from './serviceWorker'

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
