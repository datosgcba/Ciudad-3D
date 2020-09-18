import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getGeometrical as getUses } from 'utils/apiConfig'

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
    let data = (await response.json())
    data = {
      texto: 'El Área de Baja Mixtura de Usos del Suelo corresponde a áreas predominantemente residenciales con comercios minoristas y servicios personales de baja afluencia.'
    }
    // TODO: traer sólo lo necesario
    return data
  }
)

const uses = createSlice({
  name: 'uses',
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
      draftState.data = {}
    },
    [clickOnParcel.fulfilled]: (draftState, action) => {
      draftState.data = action.payload
      draftState.isLoading = false
    },
    [clickOnParcel.rejected]: (draftState) => {
      draftState.isLoading = false
      draftState.data = {}
    }
  }
})

export default uses.reducer

const actions = { ...uses.actions, clickOnParcel }
export { actions }
