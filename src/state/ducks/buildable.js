import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getBuildable } from 'utils/apiConfig'

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
    const data = (await response.json())
    // TODO: !remover smp_linderas ahora es un string
    data.parcelas_linderas.smp_linderas = ['0001', '45466', '222']
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
      smp: null
    },
    isSelected: false
  },
  extraReducers: {
    [clickOnParcel.pending]: (draftState) => {
      draftState.isLoading = true
      draftState.data = {}
      draftState.isSelected = false
    },
    [clickOnParcel.fulfilled]: (draftState, action) => {
      draftState.data = action.payload
      draftState.isLoading = false
      draftState.isSelected = true
    },
    [clickOnParcel.rejected]: (draftState) => {
      draftState.isLoading = false
      draftState.data = {}
      draftState.isSelected = false
    }
  }
})

export default buildable.reducer

const actions = { ...buildable.actions, clickOnParcel }
export { actions }
