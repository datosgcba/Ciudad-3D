import {
  getLayersGroups, getLayersByLayersGroupId, getFullLayerConfig,
  getExplorerFilters, getFullExplorerLayerConfig
} from 'utils/configQueries'
import { mapOnPromise } from 'utils/mapboxUtils'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

let mapGL = null

const add = async (layer) => {
  if (layer.type && (layer.type === 'vectortile' || layer.type === 'custom')) {
    const options = { ...layer.options }
    options.id = layer.id
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
    const mapOnLoad = mapOnPromise(mapInstance.map)('load')
    return mapOnLoad
      .then(async () => true)
      .catch(() => false)
  }, {
    condition: () => mapGL === null
  }
)

const getLayerState = (state, idGroup, idLayer) => state
  .groups[idGroup][idLayer]

const getExplorerLayerState = (state, idExplorer) => state
  .explorerLayers[idExplorer].layers

const toggleLayer = createAsyncThunk(
  'map/toggleLayer',
  async ({ idGroup, idLayer }) => {
    const layer = getFullLayerConfig(idGroup, idLayer)
    const mapOnIdle = mapOnPromise(mapGL.map)('idle')
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

const selectedExplorerFilter = createAsyncThunk(
  'map/selectedExplorerFilter',
  async (idExplorer) => {
    const explorerLayer = getFullExplorerLayerConfig(idExplorer)
    const mapOnIdle = mapOnPromise(mapGL.map)('idle')
    // TODO: bug, hay que volver a elegirlo para que se borre la capa
    // funciona como checkbox
    await toggle(explorerLayer)
    return mapOnIdle
      .then(() => true)
      .catch(() => false)
  },
  {
    condition: (idExplorer, { getState }) => {
      const state = getState()
      const explorerLayer = getExplorerLayerState(state.map, idExplorer)
      return state.map.isMapReady && explorerLayer.processingId === null
    }
  }
)

const groups = {}

// devuelve cada id y title de config.layersGroup
getLayersGroups().forEach(({ id: idGroup }) => {
  groups[idGroup] = {}
  // devuelve el title, color y id de de cada layersGroup.layers
  getLayersByLayersGroupId(idGroup).forEach(({ id: idLayer }) => {
    groups[idGroup][idLayer] = {
      processingId: null,
      isVisible: false
    }
  })
})

const explorerLayers = {}

getExplorerFilters().forEach(({ id: idExplorer }) => {
  explorerLayers[idExplorer] = {}
  explorerLayers[idExplorer].layers = {
    processingId: null,
    isVisible: false
  }
})

const map = createSlice({
  name: 'map',
  initialState: {
    isMapReady: false,
    camera: {
      lat: -34.56,
      lng: -58.47,
      zoom: 16,
      pitch: 0,
      bearing: 0
    },
    selectedCoords: null,
    groups,
    explorerLayers
  },
  reducers: {
    cameraUpdated: (draftState, {
      payload: {
        lat: newLat, lng: newLng, zoom: newZoom, pitch: newPitch, bearing: newBearing
      }
    }) => {
      const {
        lat, lng, zoom, pitch, bearing
      } = draftState.camera
      draftState.camera = {
        lat: newLat || lat,
        lng: newLng || lng,
        zoom: newZoom || zoom,
        pitch: newPitch || pitch,
        bearing: newBearing || bearing
      }
    },
    setMapReady: (draftState) => {
      draftState.isMapReady = true
    },
    clickOnMap: (draftState, action) => {
      draftState.selectedCoords = action.payload
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
        layerState.isVisible = !layerState.isVisible
      }
    },
    // TODO: Revisar porque error ¿será rejected?
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
    },
    // selectedExplorerFilter
    [selectedExplorerFilter.pending]: (draftState, {
      meta: {
        requestId,
        arg
      }
    }) => {
      const explorerLayerState = getExplorerLayerState(draftState, arg)
      explorerLayerState.processingId = requestId
    },

    [selectedExplorerFilter.fulfilled]: (draftState, {
      meta: {
        requestId,
        arg
      }
    }) => {
      const explorerLayerState = getExplorerLayerState(draftState, arg)
      if (explorerLayerState.processingId === requestId) {
        explorerLayerState.processingId = null
        explorerLayerState.isVisible = !explorerLayerState.isVisible
      }
    },

    [selectedExplorerFilter.error]: (draftState, {
      meta: {
        requestId,
        arg
      }
    }) => {
      const explorerLayerState = getExplorerLayerState(draftState, arg)
      if (explorerLayerState.processingId === requestId) {
        explorerLayerState.processingId = null
        explorerLayerState.isVisible = !explorerLayerState.isVisible
      }
    }
  }
})

export default map.reducer

const actions = {
  ...map.actions, initMap, toggleLayer, selectedExplorerFilter
}
export { actions }
