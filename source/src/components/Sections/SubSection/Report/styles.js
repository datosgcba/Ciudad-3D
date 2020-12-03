import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    backgroundColor: '#F1F1F3',
    borderRadius: '5px',
    borderLeftStyle: 'solid',
    borderWidth: 'thick'
  },
  icon: {
    padding: 0,
    float: 'right'
  }
}))
