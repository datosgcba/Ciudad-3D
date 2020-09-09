import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getBoundariesParcelsApi } from 'utils/apiConfig'

const clickOnParcel = createAsyncThunk(
  'buildable/clickOnParcel',
  async (coord) => {
    const urlApi = getBoundariesParcelsApi(coord)
    const response = await fetch(urlApi)
    const data = (await response.json())
    // TODO: traer sólo lo necesario
    console.log(data)
    return data
  }
)

const buildable = createSlice({
  name: 'buildable',
  initialState: {
    data: {
      smp: ''
    },
    previousSmp: ''
  },
  extraReducers: {
    [clickOnParcel.fulfilled]: (draftState, action) => {
      draftState.previousSmp = draftState.data.smp
      draftState.data = action.payload
    }
  }
})

export default buildable.reducer

const actions = { ...buildable.actions, clickOnParcel }
export { actions }
