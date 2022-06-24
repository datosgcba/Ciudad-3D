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
    minWidth: '0 !important'
  },
  card: {
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
  icon: {
    borderRadius: '50%',
    margin: '0 auto',
    width: '50px',
    height: '50px',
    padding: '9px',
    marginBottom: '10px',
    backgroundColor: '#F5F5F5'
  },
  paper: {
    marginTop: theme.spacing(6),
    height: theme.spacing(25),
    width: '100%',
    border: '1px solid grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  info: {
    marginTop: theme.spacing(4)
  },
  link: {
    color: '#0532ff !important'
  }
}))
