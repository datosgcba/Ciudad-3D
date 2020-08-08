import React, { useState } from 'react'
import { connect } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { Checkbox } from '@material-ui/core'
import './styles.css'
import { toggleLayer } from '../../store/actions'

const Grupo = (props) => {
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
          <img
            hspace="5"
            src={layer.icon}
            alt="icono"
            height="20"
            width="20"
          />
          <h5>{layer.title}</h5>
        </ListItem>
      ))
  )

  return (
    <>
      <div className="contenedor-layers">
        <h4 className="titulo-principal">
          {props.title}
          <Divider />
        </h4>

        <List dense className="lista-layers">
          {handlePrivacy()}
        </List>
      </div>
    </>
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
