import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  paper: {
    width: theme.spacing(45),
    padding: theme.spacing(1),
    marginLeft: theme.spacing(9.75)
  },
  container: {
    marginTop: theme.spacing(1.5),
    width: theme.spacing(38.13), // 38.13 - 305px
    padding: theme.spacing(0), // 0.5  -   4px
    paddingLeft: theme.spacing(0.5), // 0.5  -   4px
    border: '1px solid blue'
  },
  button: {
    width: '100%',
    backgroundColor: theme.palette.action.active,
    border: '1px solid green'
  }
}))
