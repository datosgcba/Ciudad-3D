import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { white } from 'material-ui/styles/colors'

// A custom theme for this app
const spacing = 8
const theme = createMuiTheme({
  overrides: {
    spacing,
    MuiCssBaseline: {
      '@global': {
        html: {
          fontSize: 16,
          backgroundColor: white[500]
        }
      }
    },
    MuiAccordionSummary: {
      root: {
        minHeight: 0,
        border: '1px solid blue',
        '&$expanded': {
          minHeight: 0
        },
        height: spacing * 3.25
      }
    },
    MuiAccordionDetails: {
      root: {
        padding: 0,
        paddingLeft: 16,
        paddingBottom: 16
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
