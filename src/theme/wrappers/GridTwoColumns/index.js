import React from 'react'

import PropTypes from 'prop-types'

import {
  Grid, FormControlLabel, Checkbox, Typography
} from '@material-ui/core'
import useFontsStyles from 'theme/fontsDecorators'

import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'

import useStyles from './styles'

const GridItems = ({
  decorators, item
}) => {
  const classes = useStyles()
  return (
    <Grid item xs={6}>
      <FormControlLabel
        className={classes.formControl}
        control={(
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
          />
        )}
      />
      <Typography variant="caption" className={`${decorators.marginTop_md} ${decorators.marginBottom_xl}`}>
        {item}
      </Typography>
    </Grid>
  )
}

const GridTwoColumns = ({ items }) => {
  const decorators = useFontsStyles()

  return (
    <Grid container spacing={0}>
      {items.map((item) => (
        <GridItems
          key={item}
          decorators={decorators}
          item={item}
        />
      ))}
    </Grid>
  )
}

GridTwoColumns.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired
}

GridItems.propTypes = {
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  item: PropTypes.string.isRequired
}

export default GridTwoColumns
