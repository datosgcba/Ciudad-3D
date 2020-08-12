import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { white } from 'material-ui/styles/colors'

// A custom theme for this app
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          fontSize: 16,
          backgroundColor: white[500]
        }
      }
    }
  },
  typography: {
    fontFamily: [
      'Nunito',
      'Roboto'
    ].join(','),
    caption: {
      letterSpacing: 0
    }
  },
  palette: {
    text: {
      primary: '#707070',
      secondary: '#D9D9D9'
    },
    action: {
      active: '#D9D9D9',
      hoverOpacity: 0.5,
      selected: 'yellow'
    },
    primary: {
      main: '#fed304'
    },
    secondary: {
      main: '#f3f3f3'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  }
})

export default theme
