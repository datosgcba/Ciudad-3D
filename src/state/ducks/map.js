import config from 'appConfig'

import { getFullLayerConfig } from 'utils/configQueries'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

let mapGL = null

const loadCustomImages = () => {
  // mapbox necesita que se agreguen las capas para referenciarlas por id
  // console.log("Cargando los iconos customizados");
  const { customIcons } = config

  customIcons.forEach((icon) => {
    mapGL.map.loadImage(icon.data, (error, image) => {
      if (error) throw error
      mapGL.map.addImage(icon.id, image)
    })
  })
}

const add = (layer) => {
  if (layer.type && (layer.type === 'vectortile' || layer.type === 'custom')) {
    const options = { ...layer.options }
    options.id = layer.id
    // console.log(mapaGL);
    mapGL.addVectorTileLayer(
      options,
      null,
      layer.displayPopup,
      layer.popupContent
    )
  } else {
    mapGL.addPublicLayer(layer.id, { clustering: true })
  }
}

const toggle = (layer) => {
  const { map } = mapGL
  if (map.getLayer(layer.id)) {
    const visibility = map.getLayoutProperty(layer.id, 'visibility')
    if (typeof visibility === 'undefined' || visibility === 'visible') {
      map.setLayoutProperty(layer.id, 'visibility', 'none')
    } else {
      map.setLayoutProperty(layer.id, 'visibility', 'visible')
    }
  } else {
    add(layer)
  }
}

const mapEventPromise = (eventName) => new Promise((resolve, reject) => {
  try {
    mapGL.map.on(eventName, () => {
      resolve()
    })
  } catch (error) {
    reject(error)
  }
})
const initMap = createAsyncThunk(
  'map/initMap',
  async (mapInstance) => {
    mapGL = mapInstance
    const mapOnLoad = mapEventPromise('load')
    return mapOnLoad
      .then(() => {
        loadCustomImages()
        return true
      })
      .catch(() => false)
  }, {
    condition: () => mapGL === null
  }
)

const getLayerState = (state, idGroup, idLayer) => state
  .groups[idGroup]
  .layers[idLayer]

const toggleLayer = createAsyncThunk(
  'map/toggleLayer',
  ({ idGroup, idLayer }) => {
    const layer = getFullLayerConfig(idGroup, idLayer)
    const mapOnLoad = mapEventPromise('idle')
    toggle(layer)
    return mapOnLoad
      .then(() => true)
      .catch(() => false)
  },
  {
    condition: ({ idGroup, idLayer }, { getState }) => {
      const state = getState()
      const layerState = getLayerState(state.map, idGroup, idLayer)
      return state.map.isMapReady && layerState.processingId === null
    }
  }
)

/*
const loadDefaultLayers = (mapaGL) => {
  // las capas se agregan cuando se termina de crear el mapa
  // console.log("Prendiendo las capas habilitadas por default");
  config.grupos.map((g) => g.layers.forEach((layer) => {
    if (layer.enabled) {
      add(layer, mapaGL)
    }
  }))
}

const init = (mapaGL) => {
  const { map } = mapaGL
  map.on('load', () => {
    loadCustomImages(mapaGL)
    loadDefaultLayers(mapaGL)
  })
}
*/
const map = createSlice({
  name: 'map',
  initialState: {
    isMapReady: false,
    groups: config.grupos.reduce((result, { id, title, layers }) => ({
      ...result,
      [id]: {
        title,
        layers: layers.reduce((result, { id }) => ({
          ...result,
          [id]: {
            isVisible: false,
            processingId: null
          }
        }), {})
      }
    }), {})
  },
  reducers: {
    setMapReady: (draftState) => {
      draftState.isMapReady = true
    }
    /*
    addLayer: (draftState, action) => {
      const layer = action.payload
      const { getMapGL } = draftState
      add(layer, getMapGL())
    },
      */
  },
  extraReducers: {
    [initMap.fulfilled]: (draftState, action) => {
      draftState.isMapReady = action.payload
    },
    [toggleLayer.pending]: (draftState, {
      meta: {
        requestId,
        arg: { idGroup, idLayer }
      }
    }) => {
      const layerState = getLayerState(draftState, idGroup, idLayer)
      layerState.processingId = requestId
      layerState.isVisible = !layerState.isVisible
    },
    [toggleLayer.fulfilled]: (draftState, {
      meta: {
        requestId,
        arg: { idGroup, idLayer }
      }
    }) => {
      const layerState = getLayerState(draftState, idGroup, idLayer)
      if (layerState.processingId === requestId) {
        layerState.processingId = null
      }
    },
    [toggleLayer.error]: (draftState, {
      meta: {
        requestId,
        arg: { idGroup, idLayer }
      }
    }) => {
      const layerState = getLayerState(draftState, idGroup, idLayer)
      if (layerState.processingId === requestId) {
        layerState.processingId = null
        layerState.isVisible = !layerState.isVisible
      }
    }
  }
})

export default map.reducer

const actions = { ...map.actions, initMap, toggleLayer }
export { actions }
