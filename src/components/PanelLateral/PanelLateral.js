import React from "react";
import { connect } from "react-redux";
import { updateMap } from "../../store/actions";
import config from "../../config";
import Categories from "../Categories/Categories";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    
  },
}));

const ConnectedPanel = () => {
  const classes = useStyles();

  const getCategories = () => {
    return config.categorias.map((c, index) => (
      <Categories key={index} title={c.title} path={c.path} />
    ));
  };
  return <Container className={classes.container}>{getCategories()}</Container>;
};

function mapDispatchToProps(dispatch) {
  return {
    updateMapInstance: (map) => dispatch(updateMap(map)),
  };
}

const mapStateToProps = (state) => {
  return {};
};

const PanelLateral = connect(
  mapDispatchToProps,
  mapStateToProps
)(ConnectedPanel);

export default PanelLateral;
