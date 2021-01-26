import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    height: '100vh',
    marginLeft: theme.spacing(9.75), // 9.75 - 78px
    boxShadow: '0 0 black'
  },
  padding: {
    paddingTop: theme.spacing(2.25), // 2.25 - 18px
    paddingLeft: theme.spacing(3.26), // 3.26 - 26.08px
    paddingRight: theme.spacing(3.12) // 3.12 - 24.96px
  },
  list: {
    width: theme.spacing(45) // 45 - 360px
  },
  table: {
    width: theme.spacing(86) // 45 - 360px
  },
  responsive: {
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(35) // 35 - 280px
    }
  }
}))
