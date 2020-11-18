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
    return mapGL.addVectorTileLayer(
      options,
      null,
      layer.displayPopup,
      layer.popupContent
    )
  }
  return mapGL.addPublicLayer(layer.id, { clustering: true })
}

const toggle = async (layer, isVisible = null) => {
  const { map } = mapGL
  if (map.getLayer(layer.id)) {
    const visibility = map.getLayoutProperty(layer.id, 'visibility') ?? 'visible'
    const nextVisibility = isVisible !== null
      ? isVisible
      : visibility === 'none'
    map.setLayoutProperty(layer.id, 'visibility', nextVisibility ? 'visible' : 'none')
    return nextVisibility
  }
  await add(layer)
    // eslint-disable-next-line no-console
    .catch((error) => console.warn('toggle add layer - catch error:', error))
  return true
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

// Notar que si el server falla el tilde parece dejar de funcionar
// si falla se desea el toggle se comporte como si el server funcionara bien
// Si se espera el tilde vuelve a funcionar, tarda porque se espera map este idle
const toggleLayer = createAsyncThunk(
  'map/toggleLayer',
  async ({ idGroup, idLayer }, { getState }) => {
    const state = getState()
    const { isVisible } = getLayerState(state.map, idGroup, idLayer)
    const layer = getFullLayerConfig(idGroup, idLayer)
    return toggle(layer, isVisible)
      .then(() => {
        const mapOnIdle = mapOnPromise(mapGL.map)('idle')
        return mapOnIdle.then(() => isVisible)
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.warn('toggleLayer catch error:', error))
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
  async ({ idExplorer, isVisible }) => {
    const explorerLayer = getFullExplorerLayerConfig(idExplorer)
    const mapOnIdle = mapOnPromise(mapGL.map)('idle')
    await toggle(explorerLayer, isVisible)
    // if visible
    return mapOnIdle
      .then(() => true)
      .catch(() => false)
  },
  {
    condition: ({ idExplorer }, { getState }) => {
      const state = getState()
      const explorerLayer = getExplorerLayerState(state.map, idExplorer)
      return explorerLayer.processingId === null
    }
  }
)
const filterUpdate = ({ mockLayer, layers }) => {
  console.log('mockLayer', mockLayer)
  console.log('layers', layers)

  layers.forEach((l) => {
    const { idLayer, groups } = l

    const newFilters = ['all',
      ...groups.map(
        ({ filter }) => (
          [
            'any',
            ...filter
          ]
        )
      )
    ]

    console.log('newFilters', newFilters)
    const layer = mapGL.map.getLayer(idLayer)
    if (layer !== undefined) {
      mapGL.setFilter(
        idLayer,
        newFilters
      )
    }
  })
}

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
      /*
      lat: -34.6079,
      lng: -58.4426,
      zoom: 13,
      */
      lat: -34.6079,
      lng: -58.4426,
      zoom: 13,
      /*
      lat: -34.574168,
      lng: -58.484989,
      zoom: 15.58,
      */
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
    },
    filterUpdate: (draftState, action) => {
      filterUpdate(action.payload)
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
    [toggleLayer.rejected]: (draftState, {
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
    // selectedExplorerFilter
    [selectedExplorerFilter.pending]: (draftState, {
      meta: {
        requestId,
        arg: { idExplorer, isVisible }
      }
    }) => {
      const explorerLayerState = getExplorerLayerState(draftState, idExplorer)
      explorerLayerState.processingId = requestId
      explorerLayerState.isVisible = isVisible
    },

    [selectedExplorerFilter.fulfilled]: (draftState, {
      meta: {
        requestId,
        arg: { idExplorer }
      }
    }) => {
      const explorerLayerState = getExplorerLayerState(draftState, idExplorer)
      if (explorerLayerState.processingId === requestId) {
        explorerLayerState.processingId = null
      }
    },

    [selectedExplorerFilter.rejected]: (draftState, {
      meta: {
        requestId,
        arg: { idExplorer }
      }
    }) => {
      const explorerLayerState = getExplorerLayerState(draftState, idExplorer)
      if (explorerLayerState.processingId === requestId) {
        explorerLayerState.processingId = null
      }
    }
  }
})

export default map.reducer

const actions = {
  ...map.actions, initMap, toggleLayer, selectedExplorerFilter
}
export { actions }
