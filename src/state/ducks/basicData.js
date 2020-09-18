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
    condition: ({ lat, lng }) => lat !== undefined && lng !== undefined
  }
)

const seekerParcel = createAsyncThunk(
  'basicData/seekerParcel',
  async (smp, { dispatch }) => {
    const url = getParcelBySmp(smp)
    const response = await fetch(url)
    const data = (await response.json())
    cameraUpdated(data, dispatch)
    // TODO: traer sólo lo necesario
    return data
  }
  // TODO: condition lat y lng
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
      // TODO: Tooltip cargando (?)
      draftState.isLoading = true
    },
    [selectedParcel.fulfilled]: (draftState, action) => {
      draftState.isSelected = true
      draftState.data = action.payload
    },
    [selectedParcel.rejected]: () => {
      // TODO: Mostrar mensaje de error al usuario (?)
      // draftState.isSelected = false
      // draftState.data = { smp: null }
    },
    [seekerParcel.pending]: (draftState) => {
      // TODO: Tooltip cargando (?)
      draftState.isLoading = true
    },
    [seekerParcel.fulfilled]: (draftState, action) => {
      draftState.isSelected = true
      draftState.data = action.payload
    }
  }
})

export default basicData.reducer

const actions = { ...basicData.actions, selectedParcel, seekerParcel }
export { actions }
