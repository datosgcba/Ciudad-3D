import { red } from '@material-ui/core/colors';
import green from '@material-ui/core/colors/green';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
   
    subtitle1: {
      fontSize: 12,
    },
  },
  palette: {
    primary: {
      main: '#fed304' 
    },
    secondary: {
      main: "#18b596",
    },    
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    text:{
      secondary: {
        main: '#FF0000',
      }
    }
  },
});

export default theme;
