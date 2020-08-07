import React from "react"
import config from "../../config"
import Categories from "../Categories"
import Container from "@material-ui/core/Container"
import useStyles from "./styles"

const ConnectedPanel = () => {
  const classes = useStyles()

  const getCategories = () => {
    return config.categorias.map((c, index) => (
      <Categories key={index} title={c.title} path={c.path} />
    ))
  }
  return <Container className={classes.container}>{getCategories()}</Container>;
}

export default ConnectedPanel
