import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getParcel } from 'utils/apiConfig'
import { actions as mapActions } from 'state/ducks/map'

const clickOnParcel = createAsyncThunk(
  'basicData/clickOnParcel',
  async (coord, { dispatch }) => {
    const url = getParcel(coord)
    const response = await fetch(url)
    const data = (await response.json())
    const [lng, lat] = data.centroide
    dispatch(mapActions.cameraUpdated({
      lat, lng, zoom: 16, pitch: 60, bearing: 0
    }))
    // TODO: traer sólo lo necesario
    return data
  },
  {
    condition: ({ lat, lng }) => lat !== undefined && lng !== undefined
  }
)

const basicData = createSlice({
  name: 'basicdata',
  initialState: {
    data: {
      smp: ''
    },
    previousSmp: ''
  },
  extraReducers: {
    [clickOnParcel.pending]: (draftState) => {
      draftState.isLoading = true
      draftState.data = ''
    },
    [clickOnParcel.fulfilled]: (draftState, action) => {
      draftState.previousSmp = draftState.data.smp
      draftState.data = action.payload
    }
  }
})

export default basicData.reducer

const actions = { ...basicData.actions, clickOnParcel }
export { actions }
