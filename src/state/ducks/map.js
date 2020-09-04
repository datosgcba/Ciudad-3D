import {
  getGroups, getLayersConfigByGroupId, getFullLayerConfig, getCustomsIcons
} from 'utils/configQueries'
import { loadImages, mapOnPromise } from 'utils/mapboxUtils'

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
      .then(async () => {
        await loadImages(mapInstance.map, getCustomsIcons())
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

const smpSelected = createAsyncThunk(
  'map/smpSelected',
  async (smp) => {
    const response = await fetch(`https://epok.buenosaires.gob.ar/catastro/geometria/?smp=${smp}`)
    const data = (await response.json())
    const geomCoords = data.features[0].geometry.coordinates[0][0]
    return geomCoords
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
    }), {}),
    parcel: {
      coord: '',
      geomCoords: ''
    }
  },
  reducers: {
    setMapReady: (draftState) => {
      draftState.isMapReady = true
    },
    clickOnMap: (draftState, action) => {
      draftState.parcel.coord = action.payload
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
    },
    [smpSelected.fulfilled]: (draftState, action) => {
      draftState.parcel.geomCoords = action.payload
    }
  }
})

export default map.reducer

const actions = {
  ...map.actions, initMap, toggleLayer, smpSelected
}
export { actions }
