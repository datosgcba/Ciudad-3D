import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getGeometricalApi } from 'utils/apiCongif'

const smpSelected = createAsyncThunk(
  'parcel/smpSelected',
  async (smp) => {
    const urlApi = getGeometricalApi(smp)
    const response = await fetch(urlApi)
    const data = (await response.json())
    return data.features[0].geometry.coordinates[0][0]
  }
)

const parcel = createSlice({
  name: 'parcel',
  initialState: {
    geomCoords: ''
  },
  extraReducers: {
    [smpSelected.fulfilled]: (draftState, action) => {
      draftState.geomCoords = action.payload
    }
  }
})

export default parcel.reducer

const actions = { ...parcel.actions, smpSelected }
export { actions }
