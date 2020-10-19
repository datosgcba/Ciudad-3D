import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 600,
    borderRadius: 1,
    height: 40,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 200
    }
  },

  input: {
    marginLeft: 5,
    paddingLeft: 5,
    width: theme.spacing(39)
  },

  iconButton: {
    padding: 10
  }
}))
