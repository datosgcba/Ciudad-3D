import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { actions as alertsActions } from 'state/ducks/alerts'
import { getUses } from 'utils/apiConfig'
import { getUsesTable } from 'utils/configQueries'

const clickOnParcel = createAsyncThunk(
  'uses/clickOnParcel',
  async (smp, { dispatch }) => {
    if (smp.length === undefined) {
      return { smp: 'Invalido' }
    }
    const url = getUses(smp)
    const response = await fetch(url)
    const { usos } = await response.json()
    const usesTable = await getUsesTable()
    const data = usos
      .map((id) => usesTable.find((ut) => ut.id === id))
      .filter((d) => d !== undefined)

    // Condiciones de alertas
    const usosCount = data
      ?.usos?.filter((value) => value > 0).length ?? 0
    if (usosCount > 1) {
      dispatch(alertsActions.addId('mixtura_usos'))
    }

    if (usosCount === 0) {
      dispatch(alertsActions.addId('no_usos'))
    }

    return data
  }
)

const uses = createSlice({
  name: 'uses',
  initialState: {
    isLoading: false,
    lastIDCAll: '',
    data: []
  },
  extraReducers: {
    [clickOnParcel.pending]: (draftState) => {
      draftState.isLoading = true
      draftState.data = []
    },
    [clickOnParcel.fulfilled]: (draftState, action) => {
      draftState.data = action.payload
      draftState.isLoading = false
    },
    [clickOnParcel.rejected]: (draftState) => {
      draftState.isLoading = false
      draftState.data = []
    }
  }
})

export default uses.reducer

const actions = { ...uses.actions, clickOnParcel }
export { actions }
