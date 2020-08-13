import config from 'config'
import { createSlice } from '@reduxjs/toolkit'

const add = (layer, mapaGL) => {
  if (layer.type && (layer.type === 'vectortile' || layer.type === 'custom')) {
    const options = { ...layer.options }
    options.id = layer.id
    // console.log(mapaGL);
    mapaGL.addVectorTileLayer(
      options,
      null,
      layer.displayPopup,
      layer.popupContent
    )
  } else {
    mapaGL.addPublicLayer(layer.id, { clustering: true })
  }
}

const toggle = (layer, mapaGL) => {
  const { map } = mapaGL

  if (map.getLayer(layer.id)) {
    const visibility = map.getLayoutProperty(layer.id, 'visibility')
    if (typeof visibility === 'undefined' || visibility === 'visible') {
      map.setLayoutProperty(layer.id, 'visibility', 'none')
    } else {
      map.setLayoutProperty(layer.id, 'visibility', 'visible')
    }
  } else {
    add(layer, mapaGL)
  }
}

const loadDefaultLayers = (mapaGL) => {
  // las capas se agregan cuando se termina de crear el mapa
  // console.log("Prendiendo las capas habilitadas por default");
  config.grupos.map((g) => g.layers.forEach((layer) => {
    if (layer.enabled) {
      add(layer, mapaGL)
    }
  }))
}

const loadCustomImages = (mapaGL) => {
  // mapbox necesita que se agreguen las capas para referenciarlas por id
  // console.log("Cargando los iconos customizados");
  const { customIcons } = config
  const { map } = mapaGL

  customIcons.map((icon) => {
    map.loadImage(icon.data, (error, image) => {
      if (error) throw error
      map.addImage(icon.id, image)
    })
  })
}

const init = (mapaGL) => {
  const { map } = mapaGL
  map.on('load', () => {
    loadCustomImages(mapaGL)
    loadDefaultLayers(mapaGL)
  })
}

const map = createSlice({
  name: 'map',
  initialState: {
    loading: true,
    mapaGL: null,
    data: null
  },
  reducers: {
    updateMap: (draftState, action) => {
      draftState.mapaGL = action.payload
    },
    initMap: (draftState, action) => {
      const { mapaGL } = draftState
      init(mapaGL)
    },
    addLayer: (draftState, action) => {
      const layer = action.payload
      const { mapaGL } = draftState
      add(layer, mapaGL)
    },
    toggleLayer: (draftState, action) => {
      const layer = action.payload
      const { mapaGL } = draftState
      toggle(layer, mapaGL)
    }
  }
})

export default map.reducer

export const {
  updateMap, initMap, addLayer, toggleLayer
} = map.actions
