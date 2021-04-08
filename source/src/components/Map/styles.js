import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  container: {
    height: '10%',
    minHeight: '100vh',
    margin: 0,
    maxWidth: '100%',
    padding: 0,
    lineHeight: 0
  },
  topMenu: {
    position: 'fixed',
    right: '50px',
    top: '10px',
    zIindex: 998,
    display: 'inline-flex'
  },
  bottomMenu: {
    position: 'fixed',
    right: '23px',
    bottom: '10px',
    zIndex: 998,
    display: 'inline-flex',
    flexDirection: 'column-reverse'
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
  },
  minimapTitleContainer: {
    display: 'table',
    width: '100%',
    background: 'rgba(255,255,255,0.6)',
    height: '25%',
    padding: 0,
    border: 0,
    position: 'absolute',
    bottom: '5%',
    transition: 'bottom .35s ease'
  },
  minimapTitle: {
    display: 'table-cell',
    verticalAlign: 'middle'
  }
}))
