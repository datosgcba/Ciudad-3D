import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    minHeight: theme.spacing(5)
  },
  subTitle: {
    marginBottom: theme.spacing(2)
  },
  button: {
    padding: 0,
    paddingRight: theme.spacing(0.5),
    minWidth: '0px !important'
  }
}))
