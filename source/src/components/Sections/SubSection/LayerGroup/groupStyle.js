import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  formControl: {
    marginRight: 0
  },
  listItem: {
    padding: 0
  },
  color: {
    width: theme.spacing(1.5),
    height: theme.spacing(1.5),
    marginRight: theme.spacing(0.8),
    border: '1px solid grey'
  },
  boxIcons: {
    width: '100%'
  },
  reference: {
    padding: 0,
    float: 'right',
    height: '18px'
  },
  info: {
    padding: 0,
    float: 'right',
    height: '18px'
  },
  iconButton: {
    padding: 0,
    float: 'right',
    marginLeft: theme.spacing(0.5)
  },
  downloadIcon: {
    height: '18px'
  },
  referenceItems: {
    padding: 5
  },
  referenceTitle: {
    paddingTop: theme.spacing(0.1)
  }
}))
