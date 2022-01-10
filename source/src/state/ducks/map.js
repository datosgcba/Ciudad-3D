import {
  loadAppConfig, getLayersGroups, getLayersByLayersGroupId, getFullLayerConfig,
  getExplorerFilters, getFullExplorerLayerConfig, getBaseLayers, getCamera
} from 'utils/configQueries'
import { mapOnPromise } from 'utils/mapboxUtils'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

let mapGL = null

const add = async (layer) => {
  if (layer.type && (layer.type === 'vectortile' || layer.type === 'custom')) {
    const options = { ...layer.options }
    options.id = layer.id
    const newLayer = mapGL.addVectorTileLayer(
      options,
      null,
      layer.displayPopup,
      layer.popupContent
    )
    return newLayer
  }
  return mapGL.addPublicLayer(layer.id, { clustering: true })
}

const reorderLayers = async (groups, layerId, index) => {
  const newOrder = Object.values(groups)
    .flatMap((group) => Object.entries(group))
    .filter(([id, { isVisible }]) => isVisible || id === layerId)
    .sort((
      [ida, { index: ia, order: oa }],
      [idb, { index: ib, order: ob }]
    ) => {
      const diff = ib - ia
      if (diff === 0) {
        return (idb === layerId ? 999999 : ob) - (ida === layerId ? 999999 : oa)
      }
      return diff
    })
  const count = newOrder.length

  if (count > 0 && mapGL.map.getLayer('parcel_layer')) {
    mapGL.map.moveLayer(newOrder[0][0], 'parcel_layer')
  }
  if (count > 0 && mapGL.map.getLayer('edif_smp')) {
    mapGL.map.moveLayer(newOrder[0][0], 'edif_smp')
  }
  for (let idx = 1; idx < count; idx += 1) {
    mapGL.map.moveLayer(newOrder[idx][0], newOrder[idx - 1][0])
  }
  if (mapGL.map.getLayer('explorer_layer') && (count > 0 || mapGL.map.getLayer('parcel_layer'))) {
    mapGL.map.moveLayer('explorer_layer', count > 0 ? newOrder[count - 1][0] : 'parcel_layer')
  }
  const order = Object.values(groups)
    .flatMap((group) => Object.entries(group))
    .filter(([id, { isVisible, index: idx }]) => isVisible && idx === index && id !== layerId)
    .reduce(
      (maxOrder, [, { order: oa }]) => (oa > maxOrder ? oa : maxOrder),
      0
    ) + 1
  return { order }
}

const toggle = async (layer, isVisible = null, index, groups) => {
  const { map } = mapGL
  if (map.getLayer(layer.id)) {
    const visibility = map.getLayoutProperty(layer.id, 'visibility') ?? 'visible'
    const nextVisibility = isVisible !== null
      ? isVisible
      : visibility === 'none'
    map.setLayoutProperty(layer.id, 'visibility', nextVisibility ? 'visible' : 'none')
    return reorderLayers(groups, layer.id, index)
  }
  return add(layer, map)
    .then(() => mapOnPromise(mapGL.map)('idle'))
    .then(() => reorderLayers(groups, layer.id, index))
    // Se visualiza la capa luego de ser ordenada
    .then(() => map.setLayoutProperty(layer.id, 'visibility', 'visible'))
    // eslint-disable-next-line no-console
    .catch((error) => console.warn('toggle add layer - catch error:', error))
}

const loadLayers = createAsyncThunk(
  'map/loadLayers',
  async () => {
    await loadAppConfig()

    const explorerLayers = {}
    getExplorerFilters().forEach(({ id: idExplorer }) => {
      explorerLayers[idExplorer] = {}
      explorerLayers[idExplorer].layers = {
        processingId: null,
        isVisible: false
      }
    })
    const groups = {}
    // devuelve cada id y title de config.layersGroup
    getLayersGroups().forEach(({ id: idGroup, index = 0 }) => {
      groups[idGroup] = {}
      // devuelve el title, id y color de cada layersGroup.layers
      getLayersByLayersGroupId(idGroup).forEach(({ id: idLayer, index: idxLayer }) => {
        groups[idGroup][idLayer] = {
          processingId: null,
          isVisible: false,
          index: idxLayer ?? index,
          order: 0
        }
      })
    })

    const baseLayers = getBaseLayers()
    return {
      explorerLayers, groups, baseLayers
    }
  }
)

const initMap = createAsyncThunk(
  'map/initMap',
  async (mapInstance) => {
    mapGL = mapInstance
    const mapOnLoad = mapOnPromise(mapInstance.map)('load')
    return mapOnLoad
      .then(() => true)
      .catch(() => false)
  }, {
    condition: () => mapGL === null
  }
)

const getLayerState = (state, idGroup, idLayer) => state
  .groups[idGroup][idLayer]

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
    const onPromise = mapOnPromise(mapGL.map)
    onPromise('idle')
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
  async ({ value }, { getState }) => {
    const idExplorer = value[0].id
    const explorerLayer = getFullExplorerLayerConfig(idExplorer)
    const mapOnIdle = mapOnPromise(mapGL.map)('idle')
    await add(explorerLayer)
    await mapOnIdle
      .then(() => reorderLayers(getState().map.groups))
      .then(() => mapGL.map.setLayoutProperty(explorerLayer.id, 'visibility', 'visible'))
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

const map = createSlice({
  name: 'map',
  initialState: {
    isMapReady: false,
    defaultMapStyle: null,
    camera: null,
    selectedCoords: null,
    groups: {},
    explorerLayers: {}
  },
  reducers: {
    isMeasureActive: (draftState, { payload: isActive }) => {
      draftState.isMeasureActive = isActive
    },
    cameraUpdated: (draftState, {
      payload: {
        lat: newLat, lng: newLng, zoom: newZoom, pitch: newPitch, bearing: newBearing
      }
    }) => {
      const {
        zoom, pitch, bearing
      } = draftState.camera
      draftState.camera = {
        lat: newLat,
        lng: newLng,
        zoom: newZoom || zoom,
        pitch: typeof (newPitch) === 'number' ? newPitch : pitch,
        bearing: typeof (newBearing) === 'number' ? newBearing : bearing
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
      payload: { order },
      meta: {
        requestId,
        arg: { idGroup, idLayer }
      }
    }) => {
      const layerState = getLayerState(draftState, idGroup, idLayer)
      if (layerState.processingId === requestId) {
        layerState.processingId = null
        layerState.order = order
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
    [loadLayers.fulfilled]: (draftState, {
      payload: {
        explorerLayers, groups, baseLayers: { sources, layers, light }
      }
    }) => {
      draftState.groups = groups
      draftState.explorerLayers = explorerLayers
      draftState.camera = getCamera()
      draftState.defaultMapStyle = {
        version: 8,
        sources,
        layers,
        glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
        light
      }
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
  removeLayer,
  loadLayers
}
export { actions }
