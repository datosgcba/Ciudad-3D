import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  box: {
    width: theme.spacing(50),
    padding: theme.spacing(1),
    backgroundColor: '#F1F1F3',
    marginLeft: theme.spacing(12),
  },
  card: {
    padding: theme.spacing(1),
    height: theme.spacing(11),
    marginTop: theme.spacing(3),
    backgroundColor: 'white',
  },
}))
