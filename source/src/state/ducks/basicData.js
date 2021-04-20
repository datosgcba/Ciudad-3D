import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getParcel, getParcelBySmp } from 'utils/apiConfig'
import { actions as mapActions } from 'state/ducks/map'
import { actions as smpActions } from 'state/ducks/parcel'

const cameraUpdated = (data, dispatch) => {
  const [lng, lat] = data.centroide
  dispatch(mapActions.cameraUpdated({
    lat, lng, zoom: 17, pitch: 60, bearing: 0
  }))
}
const selectedParcel = createAsyncThunk(
  'basicData/selectedParcel',
  async (coord, { dispatch }) => {
    const url = getParcel(coord)
    const response = await fetch(url)
    const data = (await response.json())
    cameraUpdated(data, dispatch)

    dispatch(smpActions.smpSelected(data.smp))
    return data
  },
  {
    condition: ({ lat, lng }, { getState }) => lat !== undefined
      && lng !== undefined
      && !getState().basicData.isLoading
  }
)

const seekerParcel = createAsyncThunk(
  'basicData/seekerParcel',
  async (smp, { dispatch }) => {
    if (smp !== null && smp !== undefined) {
      const url = getParcelBySmp(smp)
      const response = await fetch(url)
      const data = (await response.json())

      cameraUpdated(data, dispatch)
      dispatch(smpActions.smpSelected(data.smp))
      return data
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
