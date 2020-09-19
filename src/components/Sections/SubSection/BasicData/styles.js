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
    height: theme.spacing(8),
    backgroundColor: '#F5F5F5',
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5),
    marginBottom: theme.spacing(2)
  },
  value: {
    textAlign: 'right'
  },
  paper: {
    marginTop: theme.spacing(6),
    height: theme.spacing(25),
    width: '100%',
    border: '1px solid grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))
