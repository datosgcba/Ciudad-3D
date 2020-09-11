import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  subTitle: {
    marginBottom: theme.spacing(2)
  },
  button: {
    padding: 0,
    paddingRight: theme.spacing(0.5),
    // border: '1px solid blue',
    minWidth: '0px !important'
  },
  card: {
    height: '63px',
    backgroundColor: '#F5F5F5',
    paddingLeft: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    marginBottom: theme.spacing(2)
  }
}))
