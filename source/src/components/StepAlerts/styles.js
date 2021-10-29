import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  modal: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    background: 'white',
    color: '#121012',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '12px',
    padding: '1em',
    height: '20px',
    width: '509px'
  },

  text: {
    background: 'white',
    color: '#121012',
    width: '509px',
    fontSize: '10px',
    padding: '1em'
  }
}))
