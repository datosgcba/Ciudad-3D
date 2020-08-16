import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  paper: {
    height: '100vh',
    width: theme.spacing(45), // 45    - 360px
    paddingTop: theme.spacing(2.25), // 2.25 -  18px
    paddingLeft: theme.spacing(3.13), // 3.12 -  25px
    paddingRight: theme.spacing(3.62), // 3.62 -  29px
    marginLeft: theme.spacing(9.75), // 9.75 -  78px
    border: '1px solid green'
  }
}))
