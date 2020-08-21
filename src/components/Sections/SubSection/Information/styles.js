import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  paper: {
    backgroundColor: 'white'
  },
  card: {
    padding: theme.spacing(1),
    minHeight: theme.spacing(11),
    marginBottom: theme.spacing(3),
    backgroundColor: '#F1F1F3',
    borderLeftStyle: 'solid',
    borderWidth: 'thick',
    borderColor: '#C4A1A1',
    lineHeight: theme.spacing(20)
  }
}))
