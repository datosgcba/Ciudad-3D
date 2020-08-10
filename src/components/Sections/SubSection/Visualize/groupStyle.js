import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1.5),
    width: theme.spacing(38.13), // 38.13 - 305px
    padding: theme.spacing(0), // 0.5  -   4px
    paddingLeft: theme.spacing(0.5) // 0.5  -   4px
  },
  formControl: {
    marginRight: 0
  },
  listItem: {
    padding: 0
  },
  icon: {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    marginRight: theme.spacing(0.5)
  },
  divider: {
    height: theme.spacing(0.2)
  }
}))
