import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  box: {
    border: '1px solid #D9D9D9',
    borderLeftWidth: 3,
    borderLeftColor: '#C4A1A1',
    marginBottom: theme.spacing(2)
  },
  details: {
    border: '1px solid #D9D9D9'
  },
  button: {
    // padding: 0,
    minWidth: '0 !important'
  },
  card: {
    height: '103px',
    backgroundColor: '#F5F5F5',
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(2)
  },
  gridCategoria: {
    TextAlign: 'center',
    justifyContent: 'center'
  },
  gridText: {
    TextAlign: 'center',
    lineHeight: '17px',
    fontSize: '11.5px'
  },
  gridTituloCategoria: {
    fontWeight: 'bold',
    lineHeight: '17px',
    fontSize: '11.5px'
  }
}))
