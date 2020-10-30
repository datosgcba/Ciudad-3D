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
  subDetails: {
    backgroundColor: '#F5F5F5',
    margin: theme.spacing(0.5),
    width: theme.spacing(18),
    height: theme.spacing(10),
    padding: theme.spacing(1),
    float: 'left',
    '&:nth-last-child(-n+3)': {
      width: theme.spacing(37),
      height: 'auto'
    }
  },
  button: {
    padding: 0
  },
  listado: {
    paddingLeft: 0
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
  input: {
    width: 100,
    marginTop: -10
  }
}))
