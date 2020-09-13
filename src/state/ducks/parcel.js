import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getGeometrical } from 'utils/apiConfig'

const smpSelected = createAsyncThunk(
  'parcel/smpSelected',
  async (smp) => {
    const url = getGeometrical(smp)
    const response = await fetch(url)
    const data = (await response.json())
    return data.features[0].geometry.coordinates[0][0]
  }
)

const parcel = createSlice({
  name: 'parcel',
  initialState: {
    geomCoords: null,
    smp: null
  },
  reducers: {
    updateSmp: (draftState, action) => {
      draftState.smp = action.payload
    }
  },
  extraReducers: {
    [smpSelected.fulfilled]: (draftState, action) => {
      draftState.geomCoords = action.payload
    }
    // TODO: rejected y pending
  }
})

export default parcel.reducer

const actions = { ...parcel.actions, smpSelected }
export { actions }
