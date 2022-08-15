import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  container: {
    backgroundColor: '#f5f5f5',
    top: '5px',
    maxHeight: '90vh',
    position: 'absolute',
    zIndex: '1',
    overflow: 'auto',
    width: '320px',
    padding: '0px 10px',
    borderRadius: '5px',
    transition: 'left 0.2s'
  }
}))
