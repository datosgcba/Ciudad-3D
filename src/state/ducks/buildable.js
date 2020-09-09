import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getGeometricalApi as getBuildableApi } from 'utils/apiConfig'

const clickOnParcel = createAsyncThunk(
  'buildable/clickOnParcel',
  async (smp) => {
    console.log('buildable/clickOnParcel smp', smp)
    if(smp.length === undefined) {
      return {smp: 'Invalido'}
    }
    //console.log('buildable/clickOnParcel async', rejectWithValue)
    const urlApi = getBuildableApi(smp)
    const response = await fetch(urlApi)
      //.catch(() => rejectWithValue('algo salio mal'))
    // rejectWithValue
    let data = (await response.json())
    data = {AltMax:20, Plusvalia:500}
    // TODO: traer sólo lo necesario
    console.log('buildable/clickOnParcel', data)
    return data
  }
)

const buildable = createSlice({
  name: 'buildable',
  initialState: {
    isLoading: false,
    lastIDCAll: '',
    data: {
    }
  },
  extraReducers: {
    // TODO: clickOnParcel.pending
    [clickOnParcel.pending]: (draftState) => {
      draftState.isLoading = true
    },
    [clickOnParcel.fulfilled]: (draftState, action) => {
      draftState.data = action.payload
      draftState.isLoading = false
    },
    [clickOnParcel.rejected]: (draftState, action) => {
      console.log('clickOnParcel error:', action)
      draftState.isLoading = false
      draftState.data = action.payload
    }
  }
})

export default buildable.reducer

const actions = { ...buildable.actions, clickOnParcel }
export { actions }
