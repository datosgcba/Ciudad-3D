import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
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
