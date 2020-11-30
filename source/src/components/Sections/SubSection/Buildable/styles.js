import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  gridItem: {
    backgroundColor: '#F5F5F5',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  small: {
    maxWidth: '47%'
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
