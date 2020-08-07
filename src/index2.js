import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker'
import theme from './theme'
import App from './App'
import './fonts/fonts.css'

import authReducer from './store/reducers/auth'

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  auth: authReducer,
})

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)))

const app = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </ThemeProvider>
    ,
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))
registerServiceWorker()
