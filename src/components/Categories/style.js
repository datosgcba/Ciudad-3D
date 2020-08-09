import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  options: {
    paddingTop: theme.spacing(10),
  },
  option: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.action.active,
  },
  optionSelected: {
    color: theme.palette.primary.main,
  },
}))
