import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
  },
  button: {
    //    textAlign: 'center',
    backgroundColor: '#363636',
    backgroundImage: 'linear-gradient(to bottom,#555,#333)',
    '@global': {
      'uiIconButton-colorSecondary': {
        color: '#f0f'
      }
    }
    //    backgroundRepeat: 'repeat-x',
    //    BorderColor: 'rgba(0,0,0,.1) rgba(0,0,0,.1) rgba(0,0,0,.25)',
    //    color: '#f0f',
    //    textShadow: '0 -1px 0 rgba(0,0,0,.25)'
  },
  options: {
    height: theme.spacing(9.75),
    width: theme.spacing(22.5)
  },
  minimapLayer: {
    cursor: 'pointer',
    position: 'relative',
    width: '80px',
    height: '80px',
    backgroundColor: '#fff',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    textAlign: 'center',
    boxSizing: 'border-box',
    boxShadow: '0 0 5px #000'
  }
}))
