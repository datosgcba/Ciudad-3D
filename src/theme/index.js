import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import { white } from 'material-ui/styles/colors'

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
    MuiSvgIcon: {
      root: {
        colorPrimary: '#fed304'
      }
    },
    MuiAccordion: {
      root: {
        marginBottom: spacing,
        border: '1px solid #D9D9D9'
      }
    },
    MuiAccordionSummary: {
      root: {
        minHeight: 0,
        '&$expanded': {
          minHeight: 0
        },
        height: spacing * 4.25
      }
    },
    MuiAccordionDetails: {
      root: {
        padding: 0
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
    },
    h5: {
      marginTop: spacing,
      marginBottom: spacing * 3.35 // 3.35 -  27px
    },
    h6: {
    }
  },
  palette: {
    text: {
      primary: '#707070',
      secondary: '#D9D9D9'
    },
    action: {
      active: '#707070',
      hoverOpacity: 0.1
    },
    primary: {
      main: '#fed304!important'
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
