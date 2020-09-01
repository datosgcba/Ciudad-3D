import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const getData = createAsyncThunk(
  'https://epok.buenosaires.gob.ar/catastro/parcela',
  async (smp) => {
    const response = await fetch(`https://epok.buenosaires.gob.ar/catastro/parcela/?smp=${smp}`)
    const data = (await response.json())
    // TODO desestructurar la data o traerla en limpio
    return data
  }
)

const basicData = createSlice({
  name: 'basicdata',
  initialState: {
    smp: '',
    adress: '',
    section: '',
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
