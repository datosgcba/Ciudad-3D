import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { actions as alertsActions } from 'state/ducks/alerts'
import { getUses, getUsesCategories, getUsesRubros, getUsesReferences } from 'utils/apiConfig'
import { getUsesTable } from 'utils/configQueries'

const categorySelected = createAsyncThunk(
  'uses/categorySelected',
  async (idCategory, { getState }) => {
    const { uses: { data: [{ id: idMixtura }] } } = getState()

    const urlRubros = getUsesRubros(idCategory, idMixtura)
    const { rubros } = await fetch(urlRubros).then((res) => res.json())

    return {
      rubros, idCategory
    }
  }
)

const rubroSelected = createAsyncThunk(
  'uses/rubroSelected',
  async (idRubro, { getState }) => {
    const { uses: { data: [{ id: idMixtura, idCategory }] } } = getState()

    const urlReferences = getUsesReferences(idCategory, idMixtura, idRubro)
    const references = await fetch(urlReferences).then((res) => res.json())

    return references
  }
)

const clickOnParcel = createAsyncThunk(
  'uses/clickOnParcel',
  async (smp, { dispatch }) => {
    if (smp.length === undefined) {
      return { smp: 'Invalido' }
    }
    const url = getUses(smp)
    const urlUsesCategories = getUsesCategories()
    const response = await fetch(url).then((res) => res.json())
    const responseUsesCategories = await fetch(urlUsesCategories).then((res) => res.json())

    // const { usos } = await response
    const [{ usos }, usesCategories] = await Promise.all([response, responseUsesCategories])
    const usesTable = await getUsesTable()
    const data = usos
      .map((id) => usesTable.find((ut) => ut.id === id))
      .filter((d) => d !== undefined)

    // Condiciones de alertas
    const usosCount = data.length
    if (usosCount > 1) {
      dispatch(alertsActions.addId('mixtura_usos'))
    }

    if (usosCount === 0) {
      dispatch(alertsActions.addId('no_usos'))
    }

    data?.map(uso => {
      uso.usesCategories = usesCategories
      return uso
    })

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
    },
    [categorySelected.pending]: (draftState) => {
      draftState.isLoading = true
      if (draftState.data.length > 0) {
        draftState.data[0].rubros = []
        draftState.data[0].idCategory = null
        draftState.data[0].references = null
      }
    },
    [categorySelected.fulfilled]: (draftState, action) => {
      if (draftState.data.length > 0) {
        draftState.data[0].rubros = action.payload.rubros
        draftState.data[0].idCategory = action.payload.idCategory
      }
      draftState.isLoading = false
    },
    [categorySelected.rejected]: (draftState) => {
      draftState.isLoading = false
    },
    [rubroSelected.pending]: (draftState) => {
      draftState.isLoading = true
      if (draftState.data.length > 0) {
        draftState.data[0].references = null
      }
    },
    [rubroSelected.fulfilled]: (draftState, action) => {
      if (draftState.data.length > 0) {
        draftState.data[0].references = action.payload
      }
      draftState.isLoading = false
    },
    [rubroSelected.rejected]: (draftState) => {
      draftState.isLoading = false
    }
  }
})

export default uses.reducer

const actions = { ...uses.actions, clickOnParcel, categorySelected, rubroSelected }
export { actions }
