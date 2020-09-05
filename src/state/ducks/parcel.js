import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const smpSelected = createAsyncThunk(
  'parcel/smpSelected',
  async (smp) => {
    const response = await fetch(`https://epok.buenosaires.gob.ar/catastro/geometria/?smp=${smp}`)
    const data = (await response.json())
    const geomCoords = data.features[0].geometry.coordinates[0][0]
    return geomCoords
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
