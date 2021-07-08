import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  getParcel,
  getParcelBySmp,
  getPhoto,
  getPhotoData,
  getDataWsUsig
} from 'utils/apiConfig'
import { actions as mapActions } from 'state/ducks/map'
import { actions as smpActions } from 'state/ducks/parcel'
import { actions as buildActions } from 'state/ducks/buildable'

const cameraUpdated = (data, dispatch) => {
  const [lng, lat] = data.centroide
  dispatch(
    mapActions.cameraUpdated({
      lat,
      lng,
      zoom: 17,
      pitch: 60,
      bearing: 0
    })
  )
}

const getData = async ({ coord, smp }) => {
  const url = coord ? getParcel(coord) : getParcelBySmp(smp)
  const response = await fetch(url)
  const data = await response.json()
  const [x, y] = data?.centroide || [0, 0]
  const { barrio = '', comuna = '' } = await fetch(
    getDataWsUsig(x, y)
  ).then((r) => r.json())
  return {
    ...data,
    barrio,
    comuna
  }
}

const selectedParcel = createAsyncThunk(
  'basicData/selectedParcel',
  async (coord, { dispatch, getState }) => {
    const data = await getData({ coord })
    const { smp } = data
    if (smp) {
      if (!getState().parcel.smp) {
        cameraUpdated(data, dispatch)
      }
      dispatch(buildActions.clickOnParcel(smp))
      dispatch(smpActions.smpSelected(smp))
      const urlPhotoData = getPhotoData(smp)
      const photoData = await fetch(urlPhotoData)
        .then((response) => response.text())
        .then((text) => JSON.parse(text.slice(1, -1)))

      return {
        ...data,
        photoData: photoData.map(({ fecha }, idx) => ({
          fecha,
          photo: getPhoto(smp, idx)
        }))
      }
    }
    dispatch(smpActions.clean())
    return {
      data: {
        smp: null
      },
      photoData: []
    }
  },
  {
    condition: ({ lat, lng }, { getState }) => lat !== undefined
      && lng !== undefined
      && !getState().basicData.isLoading
      && !getState().map.isMeasureActive
  }
)

const seekerParcel = createAsyncThunk(
  'basicData/seekerParcel',
  async (smp, { dispatch }) => {
    if (smp !== null && smp !== undefined) {
      const data = await getData({ smp })

      cameraUpdated(data, dispatch)
      dispatch(buildActions.clickOnParcel(data.smp))
      dispatch(smpActions.smpSelected(data.smp))
      const urlPhotoData = getPhotoData(smp)
      const photoData = await fetch(urlPhotoData)
        .then((response) => response.text())
        .then((text) => JSON.parse(text.slice(1, -1)))

      return {
        ...data,
        photoData: photoData.map(({ fecha }, idx) => ({
          fecha,
          photo: getPhoto(smp, idx)
        }))
      }
    }
    throw new Error()
  },
  {
    condition: (_, { getState }) => !getState().basicData.isLoading
  }
)

const basicData = createSlice({
  name: 'basicData',
  initialState: {
    data: {
      smp: null
    },
    isSelected: false,
    isLoading: false
  },
  extraReducers: {
    [selectedParcel.pending]: (draftState) => {
      draftState.isLoading = true
    },
    [selectedParcel.fulfilled]: (draftState, action) => {
      draftState.isLoading = false
      draftState.isSelected = true
      draftState.data = action.payload
    },
    [selectedParcel.rejected]: (draftState) => {
      draftState.isLoading = false
    },
    [seekerParcel.pending]: (draftState) => {
      draftState.isLoading = true
    },
    [seekerParcel.fulfilled]: (draftState, action) => {
      draftState.isLoading = false
      draftState.isSelected = true
      draftState.data = action.payload
    },
    [seekerParcel.rejected]: (draftState) => {
      draftState.isLoading = false
      draftState.isSelected = false
      draftState.data = { smp: null }
    }
  }
})

export default basicData.reducer

const actions = { ...basicData.actions, selectedParcel, seekerParcel }
export { actions }
