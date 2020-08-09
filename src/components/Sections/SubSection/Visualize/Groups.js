import React, { useState } from 'react'
import { connect } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { Checkbox, Typography, Container, Avatar } from '@material-ui/core'
import { toggleLayer } from '....//../store/actions'
import useStyles from './groupStyle'

const Grupo = (props) => {
  const classes = useStyles()

  const initialState = {}
  props.layers.forEach((layer) => {
    initialState[layer.id] = layer.enabled ? layer.enabled : false
  })

  const [layers, setLayers] = useState(initialState)
  const [isChecked, setIsChecked] = useState(initialState)

  const layerChangeHandler = (layer) => (event) => {
    const { toggleLayerAction } = props
    const { checked } = event.target
    setIsChecked({ ...isChecked, [layer.id]: checked })
    toggleLayerAction(layer)
    setLayers({ ...layers, [layer.id]: checked })
  }

  const handlePrivacy = () => (
    props.layers.filter((layer) => !layer.private)
      .map((layer) => (
        <ListItem key={layer.id} className="item-layer">
          <FormControlLabel
            className="item-layer-label"
            control={(
              <Checkbox
                checked={layers[layer.id]}
                onChange={layerChangeHandler(layer)}
                name={layer.id}
                color="text"
              />
            )}
          />

          <Avatar alt="Icon" src={layer.icon} variant="square" className={classes.icon}/>
          
          <Typography variant="subtitle1">
            {layer.title}
          </Typography>
        </ListItem>
      ))
  )

  return (
    <Container>
      <Typography variant="subtitle1">
        {props.title}
        <Divider />
      </Typography>

      <List dense >
        {handlePrivacy()}
      </List>
    </Container>
  )
}

function mapStateToProps(state) {
  return { ...state.map }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleLayerAction: (layer) => dispatch(toggleLayer(layer)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grupo)
