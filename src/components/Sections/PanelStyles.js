import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  paper: {
    height: '100vh',
    width: theme.spacing(45), // 45    - 360px
    paddingTop: theme.spacing(2.25), // 2.25 -  18px
    paddingLeft: theme.spacing(3.26), // 3.12 -  26px
    paddingRight: theme.spacing(3.12), // 3.62 -  25px
    marginLeft: theme.spacing(9.75) // 9.75 -  78px
  }
}))
