import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Checkbox, FormControlLabel, Typography
} from '@material-ui/core'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import ListItem from '@material-ui/core/ListItem'

import { actions } from 'state/ducks/map'

import { useDispatch } from 'react-redux'

import useFontsStyles from 'theme/fontsDecorators'
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
const ListItems = ({
  decorators, subTitle, details, color, dispatch, idLayer, filter
}) => (
  <ListItem style={{ backgroundColor: `${color}`, paddingBottom: 0, paddingTop: 0 }}>
    <FormControlLabel
      onChange={handleChange(idLayer, filter, dispatch)}
      control={(
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
          checkedIcon={<CheckBoxIcon fontSize="large" />}
        />
      )}
    />
    <Typography variant="subtitle2" className={`${decorators.grey333} ${decorators.bold}`}>
      {`${subTitle}`}
      <Box>
        <Typography variant="subtitle2" className={`${decorators.grey333}`}>
          {details}
        </Typography>
      </Box>
    </Typography>
  </ListItem>
)

const List = ({ items }) => {
  const dispatch = useDispatch()
  const decorators = useFontsStyles()
  const classes = useStyles()
  return (
    <Box className={classes.options}>
      {
        items.map(({
          subTitle, details, color, id, idLayer, filter
        }) => (
          <ListItems
            key={id}
            id={id}
            decorators={decorators}
            subTitle={subTitle}
            details={details}
            color={color}
            dispatch={dispatch}
            idLayer={idLayer}
            filter={filter}
          />
        ))
      }
    </Box>
  )
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}
ListItems.propTypes = {
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  subTitle: PropTypes.string,
  details: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  idLayer: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  dispatch: PropTypes.string.isRequired
}
ListItems.defaultProps = {
  subTitle: ''
}

export default List
