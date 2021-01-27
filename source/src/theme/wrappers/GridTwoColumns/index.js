import React from 'react'

import PropTypes from 'prop-types'

import {
  Grid, FormControlLabel, Checkbox, Typography
} from '@material-ui/core'
import useFontsStyles from 'theme/fontsDecorators'

import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'

import { actions } from 'state/ducks/explorer'

import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'

const GridItems = ({
  decorators, title, idLayer, idExplorer: idExp, id: idItem
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isChecked = useSelector((state) => state.explorer.options[idExp][idItem].isVisible)

  const handleChange = (idExplorer, itemId, isVisible) => {
    dispatch(actions.checkChange({
      idLayer, idExplorer, itemId, isVisible
    }))
  }

  return (
    <Grid item xs={6}>
      <FormControlLabel
        className={classes.formControl}
        onChange={(_, isCheck) => handleChange(idExp, idItem, isCheck)}
        control={(
          <Checkbox
            checked={isChecked}
            icon={<CheckBoxOutlineBlankIcon fontSize="small" style={{ color: '#333' }} />}
            checkedIcon={<CheckBoxIcon fontSize="small" style={{ color: '#333' }} />}
          />
        )}
      />
      <Typography variant="caption" className={`${decorators.marginTop_md} ${decorators.marginBottom_xl}`}>
        {title}
      </Typography>
    </Grid>
  )
}

const GridTwoColumns = ({ idExplorer, idGroup, items }) => {
  const dispatch = useDispatch()
  const decorators = useFontsStyles()

  const handleChangeAllSelected = (idExp, idG, isSelected) => {
    dispatch(actions.allSelected({ idExp, idG, isSelected }))
    setTimeout(() => {
      dispatch(actions.refreshFilterRequest({ idLayer: 'explorer_layer' }))
    }, 0)
  }

  return (
    <Grid container spacing={0}>
      <FormControlLabel
        style={{ paddingLeft: '10px' }}
        control={(
          <Checkbox
            defaultChecked
            onChange={(_, isSelected) => handleChangeAllSelected(idExplorer, idGroup, isSelected)}
            icon={<CheckBoxOutlineBlankIcon fontSize="small" style={{ color: '#333' }} />}
            checkedIcon={<CheckBoxIcon fontSize="small" style={{ color: '#333' }} />}
          />
        )}
        label="Seleccionar todos"
      />
      {
        items.map(({
          title, id, idLayer, filter
        }) => (
          <GridItems
            key={id}
            idExplorer={idExplorer}
            id={id}
            decorators={decorators}
            title={title}
            idLayer={idLayer}
            filter={filter}
          />
        ))
      }
    </Grid>
  )
}

GridTwoColumns.propTypes = {
  idExplorer: PropTypes.string.isRequired,
  idGroup: PropTypes.string.isRequired,
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
}

GridItems.propTypes = {
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  idLayer: PropTypes.string.isRequired,
  idExplorer: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export default GridTwoColumns
