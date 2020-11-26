import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '400px',
    borderRadius: 1,
    height: 40,
    [theme.breakpoints.down('sm')]: {
      width: '200px'
    }
  },
  input: {
    paddingLeft: 10,
    width: '100%'
  },
  iconButton: {
    padding: 10
  },
  list: {
    fontSize: '0.6rem',
    width: '400px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      width: '200px'
    }
  }
}))
