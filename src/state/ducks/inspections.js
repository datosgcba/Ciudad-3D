import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getInspections } from 'utils/apiConfig'

const clickOnParcel = createAsyncThunk(
  'inspections/clickOnParcel',
  async (smp) => {
    if (smp.length === undefined) {
      return { smp: 'Invalido' }
    }
    // TODO: ! usar getInspections(smp)
    const url = 'https://epok.buenosaires.gob.ar/cur3d/inspecciones/?smp=72-099B-21'
    const response = await fetch(url)
    const dataState = (await response.json())
    return dataState
  }
)

const inspections = createSlice({
  name: 'inspections',
  initialState: {
    isLoading: false,
    data: []
  },
  extraReducers: {
    [clickOnParcel.pending]: (draftState) => {
      draftState.isLoading = true
      draftState.data = []
    },
    [clickOnParcel.fulfilled]: (draftState, action) => {
      draftState.data = action.payload
      draftState.isLoading = false
    },
    [clickOnParcel.rejected]: (draftState) => {
      draftState.isLoading = false
      draftState.data = []
    }
  }
})

export default inspections.reducer

const actions = { ...inspections.actions, clickOnParcel }
export { actions }
