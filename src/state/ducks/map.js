import {
  getGroups, getLayersConfigByGroupId, getFullLayerConfig, getCustomsIcons
} from 'utils/configQueries'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { promisify } from 'util'
import { promises } from 'fs'

let mapGL = null

const mapEventPromise = (eventName) => new Promise((resolve, reject) => {
  try {
    mapGL.map.on(eventName, () => {
      resolve()
    })
  } catch (error) {
    reject(error)
  }
})

// DUDAS: ¿Para que sirve esto?
const loadCustomImages = async () => {
  // mapbox necesita que se agreguen las capas para referenciarlas por id
  const loadImagePromise = (data) => new Promise(
    (resolve, reject) => mapGL.map.loadImage(data, (error, image) => {
      if (error) reject(error)
      resolve(image)
    })
  )
  await Promise.all(
    getCustomsIcons().map(({ id, data }) => loadImagePromise(data)
      .then((image) => {
        mapGL.map.addImage(id, image)
      }))
  )
}

const add = async (layer) => {
  if (layer.type && (layer.type === 'vectortile' || layer.type === 'custom')) {
    const options = { ...layer.options }
    options.id = layer.id
    // console.log(mapaGL);
    await mapGL.addVectorTileLayer(
      options,
      null,
      layer.displayPopup,
      layer.popupContent
    )
  } else {
    await mapGL.addPublicLayer(layer.id, { clustering: true })
  }
}

const toggle = async (layer) => {
  const { map } = mapGL
  if (map.getLayer(layer.id)) {
    const visibility = map.getLayoutProperty(layer.id, 'visibility')
    if (typeof visibility === 'undefined' || visibility === 'visible') {
      map.setLayoutProperty(layer.id, 'visibility', 'none')
    } else {
      map.setLayoutProperty(layer.id, 'visibility', 'visible')
    }
  } else {
    await add(layer)
  }
}

const initMap = createAsyncThunk(
  'map/initMap',
  async (mapInstance) => {
    mapGL = mapInstance
    const mapOnLoad = mapEventPromise('load')
    return mapOnLoad
      .then(async () => {
        await loadCustomImages()
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
  async ({ idGroup, idLayer }) => {
    const layer = getFullLayerConfig(idGroup, idLayer)
    const mapOnIdle = mapEventPromise('idle')
    await toggle(layer)
    return mapOnIdle
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

const map = createSlice({
  name: 'map',
  initialState: {
    isMapReady: false,
    groups: getGroups().reduce((result, { id, title }) => ({
      ...result,
      [id]: {
        title,
        layers: getLayersConfigByGroupId(id).reduce((resultLayer, { id: idLayer }) => ({
          ...resultLayer,
          [idLayer]: {
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
