import { red, yellow, deepOrange, grey } from '@material-ui/core/colors'
import { colors } from '@material-ui/core'
import green from '@material-ui/core/colors/green'

import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          fontSize: 16,
          backgroundColor: red[500],
        },
      },
    },
  },
  typography: {
    fontFamily: [
      'Nunito',
      'Roboto',
    ].join(','),
    caption: {
      letterSpacing: 0,
    },
  },
  palette: {
    text: {
      primary: {
        main: '#fed304',
      },
      secondary: {
        main: '#f3f3f3',
      },
    },
    primary: {
      main: '#fed304',
    },
    secondary: {
      main: '#f3f3f3',
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
