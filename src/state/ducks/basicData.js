import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const clickOnParcel = createAsyncThunk(
  'basicData/clickOnParcel',
  async ({ lng, lat }) => {
    const response = await fetch(`https://epok.buenosaires.gob.ar/catastro/parcela/?lng=${lng}&lat=${lat}`)
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
