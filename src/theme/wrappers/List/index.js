import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Checkbox, FormControlLabel, Typography
} from '@material-ui/core'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import ListItem from '@material-ui/core/ListItem'

import { actions as actionsExplorer } from 'state/ducks/explorer'

import { useDispatch, useSelector } from 'react-redux'

import useFontsStyles from 'theme/fontsDecorators'
import useStyles from './styles'

const ListItems = ({
  decorators, idExplorer: idExp, id: idItem, subTitle, details, color, idLayer
}) => {
  const dispatch = useDispatch()
  const isChecked = useSelector((state) => state.explorer.options[idExp][idItem].isVisible)

  const handleChange = (idExplorer, itemId, isVisible) => {
    dispatch(actionsExplorer.checkChange({
      idLayer, idExplorer, itemId, isVisible
    }))
  }
  return (
    <ListItem style={{ backgroundColor: `${color}`, paddingBottom: 0, paddingTop: 0 }}>
      <FormControlLabel
        onChange={(_, isCheck) => handleChange(idExp, idItem, isCheck)}
        control={(
          <Checkbox
            checked={isChecked}
            icon={<CheckBoxOutlineBlankIcon fontSize="small" style={{ color: '#717170' }} />}
            checkedIcon={<CheckBoxIcon fontSize="small" style={{ color: '#333' }} />}
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
}

const List = ({ idExplorer, items }) => {
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
            idExplorer={idExplorer}
            id={id}
            decorators={decorators}
            subTitle={subTitle}
            details={details}
            color={color}
            idLayer={idLayer}
            filter={filter}
          />
        ))
      }
    </Box>
  )
}

List.propTypes = {
  idExplorer: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}
ListItems.propTypes = {
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  idExplorer: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  details: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  idLayer: PropTypes.string.isRequired
}
ListItems.defaultProps = {
  subTitle: ''
}

export default List
