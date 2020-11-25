import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    height: '100%'
  },
  item: {
    width: '100%',
    marginBottom: theme.spacing(3)
  },
  textField: {
    width: '100%'
  },
  required: {
    color: 'red',
    fontSize: '13px',
    marginLeft: theme.spacing(0.5)
  },
  captcha: {
    marginBottom: theme.spacing(1.5)
  }
}))
