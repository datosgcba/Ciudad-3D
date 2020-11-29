import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1),
    minHeight: theme.spacing(11),
    marginBottom: theme.spacing(2.5),
    backgroundColor: '#F1F1F3',
    borderRadius: '5px',
    borderLeftStyle: 'solid',
    borderWidth: 'thick',
    lineHeight: theme.spacing(20)
  }
}))
