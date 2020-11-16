import React from 'react'

import PropTypes from 'prop-types'

import {
  Grid, FormControlLabel, Checkbox, Typography
} from '@material-ui/core'
import useFontsStyles from 'theme/fontsDecorators'

import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'

import { actions } from 'state/ducks/map'
import { useDispatch } from 'react-redux'

import useStyles from './styles'

// TODO: el filter podría estar en el state
const filters = [{ idLayer: '', filter: [] }]

const addFilters = (f, idx, layer, value, check) => {
  if (f.idLayer === layer) {
    if (check) {
      filters[idx].filter.push(value)
    } else {
      filters[idx].filter.pop(value)
    }
  }
}
const handleChange = (layer, value, dispatch) => (_, check) => {
  // Se crea el idLayer en filters en caso que no exista
  const existLayer = filters.find((f) => f.idLayer === layer)
  if (existLayer === undefined) {
    filters.push(
      {
        idLayer: layer,
        filter: []
      }
    )
  }
  // Se mapea filters en busca del layer correspondiente y se le agregan los filtros
  filters.map((f, idx) => addFilters(f, idx, layer, value, check))
  dispatch(actions.filterUpdate(filters))
}
const GridItems = ({
  decorators, title, idLayer, filter
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  return (
    <Grid item xs={6}>
      <FormControlLabel
        className={classes.formControl}
        onChange={handleChange(idLayer, filter, dispatch)}
        control={(
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
          />
        )}
      />
      <Typography variant="caption" className={`${decorators.marginTop_md} ${decorators.marginBottom_xl}`}>
        {title}
      </Typography>
    </Grid>
  )
}

const GridTwoColumns = ({ items }) => {
  const decorators = useFontsStyles()
  return (
    <Grid container spacing={0}>
      {items.map(({ title, idLayer, filter }) => (
        <GridItems
          key={title}
          decorators={decorators}
          title={title}
          idLayer={idLayer}
          filter={filter}
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
  title: PropTypes.string.isRequired,
  idLayer: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired
}

export default GridTwoColumns
