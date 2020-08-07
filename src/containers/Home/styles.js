
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 100;
const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      overflow: "auto",
      marginBottom: -10,
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "hidden",
      flexDirection: "column",
      height: "110vh",
    },
    fixedHeight: {
      height: 290,
    },
  
    drawerPaper: {
      position: "relative",
      overflow: "auto",
      whiteSpace: "nowrap",
      height: "100vh",
      width: drawerWidth,
      color: "black",
      marginRight: 200,
      backgroundColor: "white",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "hidden",
      zIndex: 1,
    },
  }));
  
  export default useStyles