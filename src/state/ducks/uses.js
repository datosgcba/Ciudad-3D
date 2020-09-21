import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getGeometrical as getUses } from 'utils/apiConfig'
import { getUsesTable } from 'utils/configQueries'

const clickOnParcel = createAsyncThunk(
  'uses/clickOnParcel',
  async (smp) => {
    if (smp.length === undefined) {
      return { smp: 'Invalido' }
    }
    const url = getUses(smp)
    const response = await fetch(url)
    // .catch(() => rejectWithValue('algo salio mal'))
    // rejectWithValue
    let usos = (await response.json())
    usos = [1, 2, 4]

    const usesTable = await getUsesTable()
    const data = usos
      .map((id) => usesTable.find((ut) => ut.id === id))
      // TODO: controlar con google si find devuelve null o undefined
      .filter((d) => d !== undefined)
    return data
  }
)

const uses = createSlice({
  name: 'uses',
  initialState: {
    isLoading: false,
    lastIDCAll: '',
    data: []
  },
  extraReducers: {
    // TODO: clickOnParcel.pending
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

export default uses.reducer

const actions = { ...uses.actions, clickOnParcel }
export { actions }
