import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// eslint-disable-next-line no-unused-vars
import { getWorks } from 'utils/apiConfig'

const clickOnParcel = createAsyncThunk(
  'works/clickOnParcel',
  async (smp) => {
    if (smp.length === undefined) {
      return { smp: 'Invalido' }
    }
    // TODO: ! usar getWorks(smp)
    const url = 'https://epok.buenosaires.gob.ar/cur3d/obras/?smp=66-101-001'
    const response = await fetch(url)
    const dataState = (await response.json())
    return dataState
  }
)

const works = createSlice({
  name: 'works',
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

export default works.reducer

const actions = { ...works.actions, clickOnParcel }
export { actions }
