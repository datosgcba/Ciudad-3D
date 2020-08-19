import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3.35) // 3.35 -  27px
  },
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
  },
  cardTitulo: {
    fontWeight: 'bold',
    fontSize: 21,
    letterSpacing: theme.spacing(0),
    fontFamily: 'Nunito'
  },
  cardCuerpo: {
    fontSize: 14,
    color: '#707070',
    letterSpacing: theme.spacing(0),
    fontFamily: 'Open Sans',
    lineHeight: 1.25
  }

}))
