import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getGeometrical } from 'utils/apiConfig'

import { actions as smpActions } from 'state/ducks/parcel'

const smpSelected = createAsyncThunk(
  'parcel/smpSelected',
  async (smp, { dispatch }) => {
    let url = getGeometrical(smp)
    // TODO: Eliminar cuando se corrija la Api
    if (smp[0] === '0' && smp.length > 10) {
      url = getGeometrical(smp.slice(1))
    }
    const response = await fetch(url)
    const data = (await response.json())
    dispatch(smpActions.updateSmp(smp))
    return data.features[0].geometry.coordinates[0][0]
  }
)

const parcel = createSlice({
  name: 'parcel',
  initialState: {
    isVisible: true,
    geomCoords: null,
    smp: null
  },
  reducers: {
    updateSmp: (draftState, action) => {
      draftState.smp = action.payload
    }
  },
  extraReducers: {
    [smpSelected.fulfilled]: (draftState, action) => {
      draftState.geomCoords = action.payload
    },
    [smpSelected.rejected]: (draftState) => {
      draftState.geomCoords = null
    }
  }
})

export default parcel.reducer

const actions = { ...parcel.actions, smpSelected }
export { actions }
