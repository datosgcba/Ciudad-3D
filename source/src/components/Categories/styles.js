import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  options: {
    paddingTop: theme.spacing(4),
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
    '&:nth-last-child(2)': {
      marginTop: 'auto'
    }
  },
  optionSelected: {
    color: 'yellow' // TODO: theme.palette.primary.main,
  },
  icon: {
    width: '100%',
    height: 'auto'
  }
}))
