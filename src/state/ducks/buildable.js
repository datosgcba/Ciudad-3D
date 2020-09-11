import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getGeometrical as getBuildable } from 'utils/apiConfig'

const clickOnParcel = createAsyncThunk(
  'buildable/clickOnParcel',
  async (smp) => {
    if (smp.length === undefined) {
      return { smp: 'Invalido' }
    }
    const url = getBuildable(smp)
    const response = await fetch(url)
    // .catch(() => rejectWithValue('algo salio mal'))
    // rejectWithValue
    let data = (await response.json())
    data = {
      supMaxEdi: 20,
      supEdiPla: 500,
      altMax: 6000,
      altMaxPlaLim: 400,
      uniEdi: 900,
      plu: 900,
      facOcuTot: 300,
      lisSMPParLin: 400
    }
    // TODO: traer sólo lo necesario
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
      draftState.data = ''
    },
    [clickOnParcel.fulfilled]: (draftState, action) => {
      draftState.data = action.payload
      draftState.isLoading = false
    },
    [clickOnParcel.rejected]: (draftState, action) => {
      draftState.isLoading = false
      draftState.data = action.payload
    }
  }
})

export default buildable.reducer

const actions = { ...buildable.actions, clickOnParcel }
export { actions }
