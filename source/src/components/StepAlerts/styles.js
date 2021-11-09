import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  containerList: {
    background: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    maxHeight: 540,
    margin: '4% auto',
    width: '93vh',
    overflowX: 'hidden'
  },

  title: {
    color: '#121012',
    textAlign: 'left',
    fontSize: '12px',
    padding: '1em',
    height: '25px'
  },

  text: {
    color: '#121012',
    fontSize: '10px',
    padding: '1em'
  }
}))
