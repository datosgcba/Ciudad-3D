import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { getGeometrical } from 'utils/apiConfig'

import { actions as categoriesActions } from 'state/ducks/categories'
import { actions as smpActions } from 'state/ducks/parcel'

const smpSelected = createAsyncThunk(
  'parcel/smpSelected',
  async (smp, { dispatch, getState }) => {
    const url = getGeometrical(smp)
    const response = await fetch(url)
    const data = (await response.json())
    dispatch(smpActions.updateSmp(smp))
    const { sectionId, sectionOpen } = getState().categories
    if (!sectionId || sectionId[0] !== 'Information' || !sectionOpen) {
      dispatch(categoriesActions.categorySelected('Information'))
    }
    return data.features[0].geometry.coordinates[0][0]
  },
  {
    condition: (_, { getState }) => {
      const state = getState()
      return !state.map.isMeasureActive
    }
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
    clean: (draftState) => {
      draftState.isVisiblen = false
      draftState.geomCoords = null
      draftState.smp = null
    },
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
