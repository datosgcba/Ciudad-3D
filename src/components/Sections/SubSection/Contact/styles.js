import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  label: {
    display: 'inline-block'
  },
  asterisco: {
    color: 'red',
    display: 'inline-block',
    fontSize: '13px',
    marginLeft: theme.spacing(0.5)
  },
  field: {
    width: theme.spacing(35),
    marginBottom: theme.spacing(2)
  },
  textArea: {
    width: theme.spacing(35),
    height: theme.spacing(15),
    marginBottom: theme.spacing(1.5)
  }
}))
