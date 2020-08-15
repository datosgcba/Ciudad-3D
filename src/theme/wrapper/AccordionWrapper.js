import React from 'react'

import {
  Typography, Grid, FormControlLabel, Checkbox
} from '@material-ui/core'

import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'

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
            <Grid item xs={6} className={classes.grid}>
              <FormControlLabel
                className={classes.formControl}
                control={(
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}

                    className={classes.checkBox}

                  />
                )}
              />
              {item}
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionWrapper
