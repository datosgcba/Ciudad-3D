import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const getData = createAsyncThunk(
  'basicData/getData',
  async ({ lng, lat }) => {
    const response = await fetch(`https://epok.buenosaires.gob.ar/catastro/parcela/?lng=${lng}&lat=${lat}`)
    const data = (await response.json())
    return data
  }
)

const basicData = createSlice({
  name: 'basicdata',
  initialState: {
    data: ''
  },
  reducers: {
    smpSelected: (draftState, action) => {
      draftState.smp = action.payload
    }
  },
  extraReducers: {
    [getData.fulfilled]: (draftState, action) => {
      draftState.data = action.payload
    }
  }
})

export default basicData.reducer

const actions = { ...basicData.actions, getData }
export { actions }
