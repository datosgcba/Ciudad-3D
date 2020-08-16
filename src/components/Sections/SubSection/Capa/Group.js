import React from 'react'

import PropTypes from 'prop-types'

import {
  Avatar, Checkbox, Container, FormControlLabel, Typography
} from '@material-ui/core'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import { actions } from 'state/ducks/map'
import { useDispatch, useSelector } from 'react-redux'

import { getLayersConfigByGroupIndex, getFullLayerConfig } from 'utils/configQueries'

import useStyles from './groupStyle'

const GroupItem = ({
  id, indexGroup, title, icon, classes
}) => {
  const dispatch = useDispatch()
  const isVisible = useSelector((state) => state.map.groups[indexGroup].layers[id].isVisible)

  const layerChangeHandler = (id) => ({ target: { checked } }) => {
    dispatch(actions.toggleLayer({ indexGroup, idLayer: id }))
  }
  return (
    <ListItem key={id} className={classes.listItem}>
      <FormControlLabel
        className={classes.formControl}
        control={(
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={isVisible}
            onChange={layerChangeHandler(id)}
            className={classes.checkBox}
            name={id}
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

const GroupItems = ({ index, classes }) => {
  const layersConfig = getLayersConfigByGroupIndex(index)
  return (
    layersConfig
      .filter(({ isPrivate }) => !isPrivate)
      .map(({ id }) => getFullLayerConfig(index, id))
      .map(({ id, title, icon }) => (
        <GroupItem
          key={id}
          id={id}
          indexGroup={index}
          title={title}
          icon={icon}
          classes={classes}
        />
      ))
  )
}

const Group = ({ index, title }) => {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <Typography variant="subtitle1">
        {title.toUpperCase()}
        <Divider className={classes.divider} />
      </Typography>
      <List dense>
        <GroupItems index={index} classes={classes} />
      </List>
    </Container>
  )
}

Group.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

export default Group
