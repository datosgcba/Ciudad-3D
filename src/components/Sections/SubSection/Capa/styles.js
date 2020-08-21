import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  paper: {
    width: theme.spacing(45), // 45    - 360px
    paddingTop: theme.spacing(2.25), // 2.25 -  18px
    paddingLeft: theme.spacing(3.13), // 3.12 -  25px
    paddingRight: theme.spacing(4.25), // 4.25 -  34px
    marginLeft: theme.spacing(9.75) // 9.75 -  78px
  },
  button: {
    padding: 0
  }
}))
