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
  marginTop_xl: {
    marginTop: spacing(3)
  },
  marginBottom_xl: {
    marginBottom: spacing(3.35) // 3.35 -  27px
  },
  marginBottom_ml: {
    marginBottom: spacing(2) // 2 -  16px
  },
  marginRight_md: {
    marginRight: spacing(3) // 3 -  24px
  },
  grey333: {
    color: '#333333'
  }
}))
