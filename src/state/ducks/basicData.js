import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getParcelApi } from 'utils/apiCongif'

const clickOnParcel = createAsyncThunk(
  'basicData/clickOnParcel',
  async (coord) => {
    const urlApi = getParcelApi(coord)
    const response = await fetch(urlApi)
    const data = (await response.json())
    // TODO: traer sólo lo necesario
    return data
  }
)

const basicData = createSlice({
  name: 'basicdata',
  initialState: {
    data: ''
  },
  extraReducers: {
    [clickOnParcel.fulfilled]: (draftState, action) => {
      draftState.data = action.payload
    }
  }
})

export default basicData.reducer

const actions = { ...basicData.actions, clickOnParcel }
export { actions }
