import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
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
  input: {
    width: 100,
    marginTop: -10
  }
}))
