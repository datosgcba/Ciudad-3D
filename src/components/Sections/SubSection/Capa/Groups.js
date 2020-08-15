import React, { useState } from 'react'

import PropTypes from 'prop-types'

import {
  Avatar, Checkbox, Container, FormControlLabel, Typography
} from '@material-ui/core'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import { toggleLayer } from 'state/ducks/map'
import { useDispatch } from 'react-redux'

import useStyles from './groupStyle'

const Groups = ({ layers, title }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const initialState = {}
  layers.forEach((layer) => {
    initialState[layer.id] = layer.enabled ? layer.enabled : false
  })

  const [layersState, setLayers] = useState(initialState)
  const [isChecked, setIsChecked] = useState(initialState)

  const layerChangeHandler = (layer) => ({ target: { checked } }) => {
    console.log(layer)
    setIsChecked({ ...isChecked, [layer.id]: checked })

    setLayers({ ...layersState, [layer.id]: checked })
    dispatch(toggleLayer(layer))
  }

  const HandlePrivacy = () => (
    layers.filter((layer) => !layer.private)
      .map((layer) => (
        <ListItem key={layer.id} className={classes.listItem}>
          <FormControlLabel
            className={classes.formControl}
            control={(
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                checked={layersState[layer.id]}
                onChange={layerChangeHandler(layer)}
                className={classes.checkBox}
                name={layer.id}
              />
            )}
          />
          <Avatar alt="Icon" src={layer.icon} variant="square" className={classes.icon} />
          <Typography variant="subtitle2" className={classes.description}>
            {layer.title}
          </Typography>
        </ListItem>
      ))
  )

  return (
    <Container className={classes.container}>
      <Typography variant="subtitle1" className={classes.subtitle}>
        {title.toUpperCase()}
        <Divider className={classes.divider} />
      </Typography>
      <List dense>
        <HandlePrivacy />
      </List>
    </Container>
  )
}

Groups.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  layers: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export default Groups
