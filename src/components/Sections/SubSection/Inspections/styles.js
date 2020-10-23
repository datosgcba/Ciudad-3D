import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  box: {
    marginLeft: theme.spacing(9.75), // 9.75 - 78px
    minHeight: '100vh',
    width: theme.spacing(46),
    [theme.breakpoints.down('sm')]: {
      maxWidth: theme.spacing(35)
    } // 45 - 360px
  },
  boxSubContainer: {
    paddingTop: theme.spacing(4)
  },
  paper: {
    height: theme.spacing(13.62),
    paddingTop: theme.spacing(2.25), // 2.25 - 18px
    paddingLeft: theme.spacing(3.26), // 3.12 - 26px
    borderRadius: 0
  },
  button: {
    padding: 0,
    paddingRight: theme.spacing(0.5),
    minWidth: '0px !important'
  },
  tableCell: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      textAlign: 'center'
    }
  }
}))
