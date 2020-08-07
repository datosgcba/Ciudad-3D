import {
  ADD_LAYER, INIT_MAP, TEST, TOGGLE_LAYER, UPDATE_MAP,
} from '../constants/action-types'

export function updateMap(payload) {
  return { type: UPDATE_MAP, payload }
}

export function addLayer(payload) {
  return { type: ADD_LAYER, payload }
}

export function toggleLayer(payload) {
  return { type: TOGGLE_LAYER, payload }
}

export function initMap(payload) {
  return { type: INIT_MAP, payload }
}

export function selectData(data) {
  return {
    type: TEST,
    payload: data,
  }
}
