import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3.75), // 3.75 -  30px
    width: theme.spacing(38.20),    //38.15 - 305px
    padding: theme.spacing(0),      // 0.5  -   4px
    paddingLeft: theme.spacing(0.5),// 0.5  -   4px
    //border: '0.5px solid green'
  },
  checkBox: {
    
  },
  listItem:{
    padding: 0
  },
  icon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(0.5),    
  }
}))
