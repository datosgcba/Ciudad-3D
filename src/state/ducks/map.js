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

const reorderLayers = (layerId, index, groups) => {
  const newOrder = Object.values(groups)
    .flatMap((group) => Object.entries(group))
    .filter(([id, { isVisible }]) => isVisible || id === layerId)
    // eslint-disable-next-line no-confusing-arrow
    .sort((
      [ida, { index: ia, order: oa }],
      [idb, { index: ib, order: ob }]
      // eslint-disable-next-line no-nested-ternary
    ) => {
      const diff = ib - ia
      if (diff === 0) {
        return (idb === layerId ? 999999 : ob) - (ida === layerId ? 999999 : oa)
      }
      return diff
    })
  const count = newOrder.length

  if (mapGL.map.getLayer('edif_smp')) {
    mapGL.map.moveLayer(newOrder[0], 'edif_smp')
  }
  for (let idx = 1; idx < count; idx += 1) {
    mapGL.map.moveLayer(newOrder[idx][0], newOrder[idx - 1][0])
  }
  return { order: 2 }
}

const toggle = async (layer, isVisible = null, index, groups) => {
  const { map } = mapGL
  if (map.getLayer(layer.id)) {
    const visibility = map.getLayoutProperty(layer.id, 'visibility') ?? 'visible'
    const nextVisibility = isVisible !== null
      ? isVisible
      : visibility === 'none'
    map.setLayoutProperty(layer.id, 'visibility', nextVisibility ? 'visible' : 'none')
    return reorderLayers(layer.id, index, groups)
  }
  return add(layer)
    // Orden de layers
    .then(() => reorderLayers(layer.id, index, groups))
    // eslint-disable-next-line no-console
    .catch((error) => console.warn('toggle add layer - catch error:', error))
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
    const { isVisible, index } = getLayerState(state.map, idGroup, idLayer)
    const layer = getFullLayerConfig(idGroup, idLayer)
    const { order } = await toggle(layer, isVisible, index, state.map.groups)
    await mapOnPromise(mapGL.map)('idle')
      // eslint-disable-next-line no-console
      .catch((error) => console.warn('toggleLayer catch error:', error))
    return { order }
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
  async ({ value }) => {
    const idExplorer = value[0].id
    const explorerLayer = getFullExplorerLayerConfig(idExplorer)
    const mapOnIdle = mapOnPromise(mapGL.map)('idle')
    await add(explorerLayer)
    await mapOnIdle
      .then(() => true)
      .catch(() => false)
    return 2
  }
)

const filterUpdate = createAsyncThunk(
  'map/filterUpdate',
  async ({ layers }) => {
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
      const layer = mapGL.map.getLayer(idLayer)
      if (layer !== undefined) {
        mapGL.setFilter(
          idLayer,
          newFilters
        )
      }
    })
  }
)

const removeLayer = createAsyncThunk(
  'map/removeLayer',
  async ({ idLayer }) => {
    const layer = mapGL.map.getLayer(idLayer)
    if (layer !== undefined) {
      mapGL.removeVectorTileLayer(idLayer)
    }
  }
)

const groups = {}
// devuelve cada id y title de config.layersGroup
getLayersGroups().forEach(({ id: idGroup, index = 0 }) => {
  groups[idGroup] = {}
  // devuelve el title, color y id de de cada layersGroup.layers
  getLayersByLayersGroupId(idGroup).forEach(({ id: idLayer, index: idxLayer }) => {
    groups[idGroup][idLayer] = {
      processingId: null,
      isVisible: false,
      index: idxLayer ?? index
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
      lat: -34.574168,
      lng: -58.484989,
      zoom: 15.58,
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

    [removeLayer.fulfilled]: () => {
      // TODO: respuestas
    }
  }
})

export default map.reducer

const actions = {
  ...map.actions,
  initMap,
  toggleLayer,
  selectedExplorerFilter,
  filterUpdate,
  removeLayer
}
export { actions }
