import {
  UPDATE_MAP, ADD_LAYER, TOGGLE_LAYER, INIT_MAP, CATEGORY_SELECTED, TEST
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
    payload: data
  }
}

export function CategorySelected(payload) {
  return { type: CATEGORY_SELECTED, payload }
}
