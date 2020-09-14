import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  box: {
    border: '1px solid #D9D9D9',
    borderLeftWidth: 3,
    borderLeftColor: '#C4A1A1',
    marginBottom: theme.spacing(2)
  },
  details: {
    border: '1px solid #D9D9D9'
  },
  subDetails: {
    backgroundColor: '#F5F5F5',
    margin: theme.spacing(0.5),
    width: theme.spacing(18),
    height: theme.spacing(10),
    padding: theme.spacing(1),
    float: 'left',
    '&:last-child': {
      width: theme.spacing(37)
    }
  },
  button: {
    // padding: 0,
    minWidth: '0px !important'
  }
}))
