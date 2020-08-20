import React from 'react'

import {
  Avatar, Checkbox, FormControlLabel, Typography
} from '@material-ui/core'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'

import ListItem from '@material-ui/core/ListItem'

import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'state/ducks/map'

import { getLayersConfigByGroupId, getFullLayerConfig } from 'utils/configQueries'

import PropTypes from 'prop-types'
import useStyles from './groupStyle'

const GroupItem = ({
  idGroup, idLayer, title, icon
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isVisible = useSelector((state) => state.map.groups[idGroup].layers[idLayer].isVisible)

  const layerChangeHandler = () => {
    dispatch(actions.toggleLayer({ idGroup, idLayer }))
  }
  return (
    <ListItem key={idLayer} className={classes.listItem}>
      <FormControlLabel
        className={classes.formControl}
        control={(
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={isVisible}
            onChange={layerChangeHandler}
            className={classes.checkBox}
            name={idLayer}
          />
                )}
      />
      <Avatar alt="Icon" src={icon} variant="square" className={classes.icon} />
      <Typography variant="subtitle2" className={classes.description}>
        {title}
      </Typography>
    </ListItem>
  )
}

const GroupItems = ({ idGroup, classes }) => {
  const layersConfig = getLayersConfigByGroupId(idGroup)
  return (
    layersConfig
      .filter(({ isPrivate }) => !isPrivate)
      .map(({ id }) => getFullLayerConfig(idGroup, id))
      .map(({ id, title, icon }) => (
        <GroupItem
          key={id}
          idGroup={idGroup}
          idLayer={id}
          title={title}
          icon={icon}
          classes={classes}
        />
      ))
  )
}

GroupItem.propTypes = {
  idGroup: PropTypes.string.isRequired,
  idLayer: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default GroupItems
