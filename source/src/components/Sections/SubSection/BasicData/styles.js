import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
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
  link: {
    color: '#0532ff !important'
  }
}))
