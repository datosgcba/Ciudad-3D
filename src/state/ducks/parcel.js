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
    geomCoords: null
  },
  extraReducers: {
    [smpSelected.fulfilled]: (draftState, action) => {
      // eslint-disable-next-line no-console
      console.log('parcel Fullfilled: ', action.payload)
      draftState.geomCoords = action.payload
    },
    [smpSelected.rejected]: (draftState, action) => {
      // eslint-disable-next-line no-console
      console.log('parcel Rejected: ', action.payload)
    }
  }
})

export default parcel.reducer

const actions = { ...parcel.actions, smpSelected }
export { actions }
