import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getGeometrical as getAffectations } from 'utils/apiConfig'
import { getAffectationsTable } from 'utils/configQueries'

const clickOnParcel = createAsyncThunk(
  'affectations/clickOnParcel',
  async (smp) => {
    if (smp.length === undefined) {
      return { smp: 'Invalido' }
    }
    const url = getAffectations(smp)
    const response = await fetch(url)
    // .catch(() => rejectWithValue('algo salio mal'))
    // rejectWithValue
    const afectaciones = (await response.json())

    const afectacionesFiltrado = Object.entries(afectaciones).filter(([, value]) => value
    === 1).map(([key]) => key)

    const affectationsTable = await getAffectationsTable()
    const data = afectacionesFiltrado
      .map((id) => affectationsTable.find((at) => at.id === id))
      // TODO: controlar con google si find devuelve null o undefined
      .filter((d) => d !== undefined)
    return data
  }
)

const affectations = createSlice({
  name: 'affectations',
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

export default affectations.reducer

const actions = { ...affectations.actions, clickOnParcel }
export { actions }
