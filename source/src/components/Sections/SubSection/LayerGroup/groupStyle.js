import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1.5),
    width: theme.spacing(38.13), // 38.13 - 305px
    padding: theme.spacing(0),
    paddingLeft: theme.spacing(0.5) // 0.5  -   4px
  },
  formControl: {
    marginRight: 0
  },
  listItem: {
    padding: 0
  },
  color: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    marginRight: theme.spacing(0.5),
    border: '1px solid grey'
  },
  divider: {
    height: theme.spacing(0.2)
  },
  boxIcons: {
    width: '100%'
  },
  info: {
    padding: 0,
    float: 'right'
  },
  downloadIcon: {
    padding: 0,
    float: 'right',
    marginLeft: theme.spacing(1)
  }
}))
