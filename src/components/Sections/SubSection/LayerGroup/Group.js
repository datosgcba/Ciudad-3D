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

import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'state/ducks/map'

import useFontsStyles from 'theme/fontsDecorators'

import { getLayersConfigByGroupId, getFullLayerConfig } from 'utils/configQueries'

import useStyles from './groupStyle'

const GroupItem = ({
  idGroup, idLayer, title, icon, classes
}) => {
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
      <Typography variant="subtitle2">
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

const Group = ({ id, title }) => {
  const classes = useStyles()
  const decorators = useFontsStyles()

  return (
    <Container className={classes.container}>
      <Typography variant="subtitle1" className={decorators.bold}>
        {title.toUpperCase()}
        <Divider className={classes.divider} />
      </Typography>
      <List dense>
        <GroupItems idGroup={id} classes={classes} />
      </List>
    </Container>
  )
}

Group.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

GroupItem.propTypes = {
  idGroup: PropTypes.string.isRequired,
  idLayer: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.any).isRequired
}
GroupItem.defaultProps = {
  icon: ''
}

export default Group
