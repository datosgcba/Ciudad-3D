import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getBuildable, getPlusvalia } from 'utils/apiConfig'

const areaChanged = createAsyncThunk(
  'buildable/areaChanged',
  async ({ smp, text }) => {
    // TODO: remove default value
    if (!smp) {
      // eslint-disable-next-line no-param-reassign
      smp = '08-017-011'
    }
    smp = '0' + smp
    const area = Number.parseFloat(text)
    if (Number.isNaN(area) || !smp || smp.length === 0) {
      return {
        plusvalia: {
          plusvalia_em: '-',
          plusvalia_pl: '-',
          plusvalia_sl: '-'
        }
      }
    }
    const url = getPlusvalia(smp, area)
    const response = await fetch(url)
    // .catch(() => rejectWithValue('algo salio mal'))
    // rejectWithValue
    const data = (await response.json())
    return {
      plusvalia: data
    }
  }
)

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
    data: {},
    plusvalia: {},
    isSelected: false
  },
  extraReducers: {
    [areaChanged.fulfilled]: (draftState, action) => {
      draftState.plusvalia = action.payload
      draftState.isLoading = false
    },
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

const actions = { ...buildable.actions, clickOnParcel, areaChanged }
export { actions }
