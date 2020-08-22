import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(({ spacing }) => ({
  bold: {
    fontWeight: 'bold'
  },
  openSans: {
    fontFamily: 'Open Sans'
  },
  marginTop_md: {
    marginTop: spacing(1)
  },
  marginBottom_xl: {
    marginBottom: spacing(3.35) // 3.35 -  27px
  }
}))
