import { red, yellow, deepOrange } from '@material-ui/core/colors'
import {colors } from '@material-ui/core'
import green from '@material-ui/core/colors/green'
import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  typography: {

    subtitle1: {
      fontSize: 12,
    },
  },
  palette: {
    primary: deepOrange/*{
      main: '#fed304',
    }*/,
    secondary: {
      main: '#18b596',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    text: {
      secondary: {
        main: '#FF0000',
      },
    },
  },
})

export default theme
