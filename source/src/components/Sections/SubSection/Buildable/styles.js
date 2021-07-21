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
  },
  tooltip: {
    marginLeft: theme.spacing(0.5),
    float: 'left'
  },
  info: {
    height: '17px',
    width: '17px'
  },
  title: {
    float: 'left',
    display: 'inline'
  },
  link: {
    color: '#0532ff !important'
  }
}))
