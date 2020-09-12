import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getParcel } from 'utils/apiConfig'
import { actions as mapActions } from 'state/ducks/map'

const selectedParcel = createAsyncThunk(
  'basicData/selectedParcel',
  async (coord, { dispatch }) => {
    const url = getParcel(coord)
    const response = await fetch(url)
    const data = (await response.json())
    const [lng, lat] = data.centroide
    dispatch(mapActions.cameraUpdated({
      lat, lng, zoom: 16, pitch: 60, bearing: 0
    }))
    // TODO: traer sólo lo necesario
    return data
  },
  {
    condition: ({ lat, lng }) => lat !== undefined && lng !== undefined
  }
)

const basicData = createSlice({
  name: 'basicData',
  initialState: {
    data: {
      smp: null
    },
    isLoading: false
  },
  extraReducers: {
    [selectedParcel.pending]: (draftState) => {
      // TODO: Tooltip cargando (?)
      draftState.isLoading = true
    },
    [selectedParcel.fulfilled]: (draftState, action) => {
      // eslint-disable-next-line no-console
      console.log('BasicData fulfilled')
      draftState.previousSmp = draftState.data.smp
      draftState.data = action.payload
    },
    [selectedParcel.rejected]: (draftState) => {
      // eslint-disable-next-line no-console
      console.log('BasicData rejected')
      // TODO: Mostrar mensaje de error al usuario (?)
      draftState.data = { smp: null }
    }
  }
})

export default basicData.reducer

const actions = { ...basicData.actions, selectedParcel }
export { actions }
