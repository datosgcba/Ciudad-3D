import React, { useState } from 'react'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import {
  Checkbox, Typography, Container, Avatar,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { toggleLayer } from '....//../store/actions'
import useStyles from './groupStyle'

const Groups = (props) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const initialState = {}
  props.layers.forEach((layer) => {
    initialState[layer.id] = layer.enabled ? layer.enabled : false
  })

  const [layers, setLayers] = useState(initialState)
  const [isChecked, setIsChecked] = useState(initialState)

  const layerChangeHandler = (layer) => (event) => {
    const { checked } = event.target
    setIsChecked({ ...isChecked, [layer.id]: checked })

    setLayers({ ...layers, [layer.id]: checked })
    dispatch(toggleLayer(layer))
  }

  const handlePrivacy = () => (
    props.layers.filter((layer) => !layer.private)
      .map((layer) => (
        <ListItem key={layer.id} className={classes.listItem}>
          <FormControlLabel
            className={classes.formControl}
            control={(
              <Checkbox
                checked={layers[layer.id]}
                onChange={layerChangeHandler(layer)}
                className={classes.checkBox}
                name={layer.id}
                color="text"
              />
            )}
          />
          <Avatar alt="Icon" src={layer.icon} variant="square" className={classes.icon} />
          <Typography variant="subtitle1">
            {layer.title}
          </Typography>
        </ListItem>
      ))
  )

  return (
    <Container className={classes.container}>
      <Typography variant="h6">
        {props.title}
        <Divider />
      </Typography>

      <List dense>
        {handlePrivacy()}
        {' '}
        {/* Pasar a componente */}
      </List>
    </Container>
  )
}

export default Groups
