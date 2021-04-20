import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    minHeight: theme.spacing(5),
    marginBottom: theme.spacing(3)
  },
  subTitle: {
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(1)
  },
  button: {
    padding: 0,
    paddingRight: theme.spacing(0.5),
    marginBottom: '5px',
    minWidth: '0px !important'
  },
  tooltip: {
    marginLeft: theme.spacing(0.5),
    marginTop: '5px'
  },
  info: {
    height: '17px',
    width: '17px'
  },
  sectionTitle: {
    float: 'left',
    display: 'inline'
  }
}))
