import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerList: {
    background: 'white',
    maxHeight: 540,
    width: '700px',
    overflowX: 'hidden'
  },

  title: {
    color: '#121012',
    padding: '1em',
    height: '25px'
  },

  text: {
    color: '#121012',
    padding: '1em'
  }
}))
