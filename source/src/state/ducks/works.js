import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getWorks } from 'utils/apiConfig'

const clickOnParcel = createAsyncThunk(
  'works/clickOnParcel',
  async (smp) => {
    if (smp.length === undefined) {
      return { smp: 'Invalido' }
    }
    const url = getWorks(smp)
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
