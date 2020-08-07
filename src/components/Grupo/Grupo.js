import React, { useState } from 'react'
import { connect } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import HelpIcon from '@material-ui/icons/Help'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Tooltip from '@material-ui/core/Tooltip'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { Checkbox, ListItemIcon } from '@material-ui/core'
import './styles.css'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import IconButton from '@material-ui/core/Button'
import { toggleLayer } from '../../store/actions'

const Grupo = (props) => {
  const initialState = {}
  props.layers.forEach((layer) => {
    initialState[layer.id] = layer.enabled ? layer.enabled : false
  })

  const { logged } = props

  const [layers, setLayers] = useState(initialState)
  const [isChecked, setIsChecked] = useState(initialState)

  const layerChangeHandler = (layer) => (event) => {
    const { toggleLayerAction } = props
    const { checked } = event.target
    setIsChecked({ ...isChecked, [layer.id]: checked })
    toggleLayerAction(layer)
    setLayers({ ...layers, [layer.id]: checked })
  }

  const handlePrivacy = () => {
    if (!logged) {
      return (
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
                    color="primary"
                  />
                )}
                label={layer.title}
              />

              {isChecked[layer.id]

                && (
                <img
                  hspace="7"
                  src={layer.icon}
                  alt="icono"
                  height="20"
                  width="20"
                />
                )}

              {isChecked[layer.id] && layer.link
              && (
              <IconButton color="primary" href={layer.link} target="_blank">
                {' '}
                <CloudDownloadIcon />
                {' '}
              </IconButton>
              )}
            </ListItem>
          ))
      )
    }
    return (
      props.layers.map((layer) => (
        <ListItem key={layer.id} className="item-layer">
          <FormControlLabel
            className="item-layer-label"
            control={(
              <Checkbox
                checked={layers[layer.id]}
                onChange={layerChangeHandler(layer)}
                name={layer.id}
                color="primary"
              />
                )}
            label={layer.title}
          />

          {isChecked[layer.id]

                && (
                <img
                  hspace="7"
                  src={layer.icon}
                  alt="icono"
                  height="20"
                  width="20"
                />
                )}

          {isChecked[layer.id] && layer.link
              && (
              <IconButton color="primary" href={layer.link} target="_blank">
                {' '}
                <CloudDownloadIcon />
                {' '}
              </IconButton>
              )}
        </ListItem>
      ))

    )
  }

  return (
    <>
      <div className="contenedor-layers">
        <h4 className="titulo-principal">
          {props.title}
          <Tooltip
            title={props.help}
            placement="right-start"
            arrow
            className="layer-tooltip"
          >
            <ListItemIcon>
              <HelpIcon className="icono-help" />
            </ListItemIcon>
          </Tooltip>
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
