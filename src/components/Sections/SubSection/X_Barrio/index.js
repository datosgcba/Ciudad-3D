import React from 'react'

import {
  Container, Paper, Typography, Button, IconButton, Accordion, AccordionSummary, AccordionDetails,
  ListItem, ListItemIcon, Checkbox, ListItemText, List, Grid
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { CategorySelected } from 'store/actions'
import { useDispatch } from 'react-redux'

import useStyles from './styles'

const X_Barrio = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [checked, setChecked] = React.useState([0])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const ListItems = () => (
    <List className={classes.root}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`

        return (
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
          </ListItem>
        )
      })}
    </List>
  )

  return (
    <Paper className={classes.paper}>
      <IconButton className={classes.iconButton}>
        <ArrowBackIcon className={classes.arrow} />
      </IconButton>
      <Container className={classes.container}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="subtitle1" className={classes.subtitle}>
              BARRIO
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <ListItem  role={undefined} dense button onClick={handleToggle()}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf() !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': 'labelId' }}
                    />
                  </ListItemIcon>
                  <ListItemText id={'labelId'} primary={`Line item ${'' + 1}`} />
                </ListItem>
              </Grid>
              <Grid item xs={6}>
                <ListItem  role={undefined} dense button onClick={handleToggle()}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf() !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': 'labelId' }}
                    />
                  </ListItemIcon>
                  <ListItemText id={'labelId'} primary={`Line item ${'' + 1}`} />
                </ListItem>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Button className={classes.button} onClick={() => dispatch(CategorySelected('Visualizar'))}>
          Visualizar
        </Button>
      </Container>
    </Paper>
  )
}

export default X_Barrio
