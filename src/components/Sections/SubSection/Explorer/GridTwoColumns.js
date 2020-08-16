import React from 'react'

import {
  Grid, FormControlLabel, Checkbox, Typography
} from '@material-ui/core'

import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'

import PropTypes from 'prop-types'

import useStyles from './styles'

const GridTwoColumns = ({ items }) => {
  const classes = useStyles()

  return (
    <Grid container spacing={0}>
      {items.map((item) => (
        <Grid item xs={6}>
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
          <Typography variant="caption" className={classes.title}>
            {item}
          </Typography>
        </Grid>
      ))}
    </Grid>
  )
}

GridTwoColumns.propTypes = {
  items: PropTypes.string.isRequired
}

export default GridTwoColumns
