import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  accordion: {
    marginBottom: theme.spacing(1),
    border: '1px solid #D9D9D9'
  },
  formControl: {
    marginRight: 0
  },
  grid: {
    padding: '0 !important',
    paddingLeft: '12px !important'
  },
  checkBox: {
    width: theme.spacing(0.5),
    paddingLeft: '16px !important'
  }
}))
