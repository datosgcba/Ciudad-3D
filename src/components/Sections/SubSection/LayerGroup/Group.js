import React from 'react'

import PropTypes from 'prop-types'

import {
  Checkbox, Container, FormControlLabel, Typography, Box
} from '@material-ui/core'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import { actions } from 'state/ducks/map'
import { useDispatch } from 'react-redux'

import useFontsStyles from 'theme/fontsDecorators'

import { getLayersByLayersGroupId } from 'utils/configQueries'

import useStyles from './groupStyle'

const GroupItem = ({
  idGroup, idLayer, title, color, classes
}) => {
  const dispatch = useDispatch()

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
            onChange={layerChangeHandler}
            className={classes.checkBox}
            name={idLayer}
          />
        )}
      />
      <Box className={classes.icon} style={{ backgroundColor: `${color}` }} />
      <Typography variant="subtitle2">
        {title}
      </Typography>
    </ListItem>
  )
}

const GroupItems = ({ idGroup, classes }) => {
  const layersConfig = getLayersByLayersGroupId(idGroup)
  return (
    layersConfig
      .map(({ title, color }) => (
        <GroupItem
          key={title}
          title={title}
          color={color}
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
        {title}
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
  color: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.any).isRequired
}
GroupItem.defaultProps = {
  color: ''
}

export default Group
