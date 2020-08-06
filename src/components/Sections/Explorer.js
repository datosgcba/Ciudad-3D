import React from "react";
import { Paper, Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import config from "../../config";

const useStyles = makeStyles((theme) => ({
  box: {
    width: theme.spacing(50),
    padding: theme.spacing(1),
    backgroundColor: "#F1F1F3",
  },
  card: {
    padding: theme.spacing(1),
    height: theme.spacing(11),
    marginTop: theme.spacing(3)
  },
}));
const getItems = (classes) => {
  return config.grupos.map((g, index) => (
    <Card className={classes.card} borderRight={5}>
      <Typography variant="subtitle1"> {g.title} </Typography>
      <Typography variant="caption"> {g.help} </Typography>
    </Card>
  ));
};

const Explorer = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.box}>
      <Typography variant="h5"> {props.title} </Typography>
      {getItems(classes)}
    </Paper>
  );
};

export default Explorer;
