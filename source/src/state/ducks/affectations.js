import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getAffectations } from 'utils/apiConfig'
import { getAffectationsTable } from 'utils/configQueries'

const clickOnParcel = createAsyncThunk(
  'affectations/clickOnParcel',
  async (smp) => {
    if (smp.length === undefined) {
      return { smp: 'Invalido' }
    }
    const url = getAffectations(smp)
    const response = await fetch(url)
    const afectaciones = (await response.json())

    const afectacionesFiltrado = Object.entries(afectaciones).filter(([, value]) => value
    !== 0).map(([key]) => key)

    const affectationsTable = await getAffectationsTable()
    const data = afectacionesFiltrado
      .map((id) => affectationsTable.find((at) => at.id === id))
      .filter((d) => d !== undefined)
    return data
  }
)

const affectations = createSlice({
  name: 'affectations',
  initialState: {
    isLoading: false,
    lastIDCAll: '',
    data: null
  },
  extraReducers: {
    [clickOnParcel.pending]: (draftState) => {
      draftState.isLoading = true
      draftState.data = null
    },
    [clickOnParcel.fulfilled]: (draftState, action) => {
      draftState.data = action.payload
      draftState.isLoading = false
    },
    [clickOnParcel.rejected]: (draftState) => {
      draftState.isLoading = false
      draftState.data = null
    }
  }
})

export default affectations.reducer

const actions = { ...affectations.actions, clickOnParcel }
export { actions }
