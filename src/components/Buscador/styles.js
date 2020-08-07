import { makeStyles } from "@material-ui/core/styles"

export default makeStyles(theme => ({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      maxWidth: 300,
      borderRadius: 1,
      height: 40
    },
  
    input: {
      marginLeft: 5,
      paddingLeft: 5,
      width: 100
    },
  
    iconButton: {
      padding: 10
    }
  }))