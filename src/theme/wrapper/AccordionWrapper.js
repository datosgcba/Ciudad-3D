import React from 'react'

import { Typography, Grid } from '@material-ui/core'

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import useStyles from './accordionStyles'

const AccordionWrapper = ({ title, items }) => {
  const classes = useStyles()

  return (
    <Accordion className={classes.accordion} elevation={0}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={6}>
              {item}
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionWrapper
