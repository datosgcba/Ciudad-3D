import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getParcel, getParcelBySmp } from 'utils/apiConfig'
import { actions as mapActions } from 'state/ducks/map'

const cameraUpdated = (data, dispatch) => {
  const [lng, lat] = data.centroide
  dispatch(mapActions.cameraUpdated({
    lat, lng, zoom: 17, pitch: 60, bearing: 0
  }))
}
const selectedParcel = createAsyncThunk(
  'basicData/selectedParcel',
  async (coord, { dispatch }) => {
    const url = getParcel(coord)
    const response = await fetch(url)
    const data = (await response.json())
    cameraUpdated(data, dispatch)
    // TODO: traer sólo lo necesario
    return data
  },
  {
    condition: ({ lat, lng }, { getState }) => lat !== undefined
      && lng !== undefined
      && !getState().basicData.isLoading
  }
)

const seekerParcel = createAsyncThunk(
  'basicData/seekerParcel',
  async (smp, { dispatch }) => {
    if (smp !== null && smp !== undefined) {
      let url = getParcelBySmp(smp)
      // TODO: Eliminar cuando se corrija la Api
      if (smp[0] === '0' && smp.length > 10) {
        url = getParcelBySmp(smp.slice(1))
      }
      const response = await fetch(url)
      const data = (await response.json())

      cameraUpdated(data, dispatch)
      // TODO: traer sólo lo necesario
      return data
    }
    throw new Error()
  },
  {
    condition: (_, { getState }) => !getState().basicData.isLoading
  }
)

const basicData = createSlice({
  name: 'basicData',
  initialState: {
    data: {
      smp: null
    },
    isSelected: false,
    isLoading: false
  },
  extraReducers: {
    [selectedParcel.pending]: (draftState) => {
      // TODO: Spinner cargando (?)
      draftState.isLoading = true
    },
    [selectedParcel.fulfilled]: (draftState, action) => {
      draftState.isLoading = false
      draftState.isSelected = true
      draftState.data = action.payload
    },
    [selectedParcel.rejected]: (draftState) => {
      // TODO: Mostrar mensaje de error al usuario (?)
      draftState.isLoading = false
    },
    [seekerParcel.pending]: (draftState) => {
      // TODO: Spinner cargando (?)
      draftState.isLoading = true
    },
    [seekerParcel.fulfilled]: (draftState, action) => {
      draftState.isLoading = false
      draftState.isSelected = true
      draftState.data = action.payload
    },
    [seekerParcel.rejected]: (draftState) => {
      // TODO: Mostrar mensaje de error al usuario (?)
      draftState.isLoading = false
      draftState.isSelected = false
      draftState.data = { smp: null }
    }
  }
})

export default basicData.reducer

const actions = { ...basicData.actions, selectedParcel, seekerParcel }
export { actions }
