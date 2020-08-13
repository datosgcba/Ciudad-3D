import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  paper: {
    width: theme.spacing(45), // 45    - 360px
    height: '100vh',
    paddingTop: theme.spacing(2.25), // 2.25 -  18px
    paddingLeft: theme.spacing(3.13), // 3.12 -  25px
    paddingRight: theme.spacing(4.25), // 4.25 -  34px
    marginLeft: theme.spacing(9.75) // 9.75 -  78px
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3.35) // 3.35 -  27px
  },
  container: {
    marginTop: theme.spacing(1.5),
    width: theme.spacing(38.13), // 38.13 - 305px
    padding: theme.spacing(0), // 0.5  -   4px
    paddingLeft: theme.spacing(0.5) // 0.5  -   4px
    // border: '1px solid red'
  },
  button: {
    width: '100%',
    backgroundColor: theme.palette.action.active
    // border: '1px solid green'
  }
}))
