import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  options: {
    paddingTop: theme.spacing(10),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
  option: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.action.active,
    alignSelf: 'center',
    '&:last-child': {
      marginTop: 'auto'
    }
  },
  optionSelected: {
    color: 'yellow', // theme.palette.primary.main,
    backgroundColor: 'red'
  }
}))
