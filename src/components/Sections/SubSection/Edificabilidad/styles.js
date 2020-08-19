import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3.35) // 3.35 -  27px
  },
  container: {
    border: '1px solid #D9D9D9',
    borderLeftWidth: 3,
    borderLeftColor: '#C4A1A1',
    marginBottom: theme.spacing(2)
  },
  details: {
    border: '1px solid #D9D9D9'
  }
}))
