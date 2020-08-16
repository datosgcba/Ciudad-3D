import React from 'react'

import {
  Container, Paper, Typography, Button, ListItem, ListItemIcon, Checkbox, ListItemText, List
} from '@material-ui/core'

import AccordionWrapper from 'theme/wrapper/AccordionWrapper'

import config from 'appConfig'

import useStyles from './styles'

const Explorer = () => {
  const classes = useStyles()

  const { options } = config.categorias.find((c) => c.title === 'Explorar')
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" className={classes.title}>
        Explorar
      </Typography>
      <Container className={classes.container}>
        {
          options.map(({ title, items }) => (
            <AccordionWrapper
              title={title}
              items={items}
            />
          ))
        }
        {/*
        <Button className={classes.button}>
          Visualizar
        </Button>
         */}
      </Container>
    </Paper>
  )
}

export default Explorer
