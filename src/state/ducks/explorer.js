import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getExplorer, getExplorerOptions } from 'utils/configQueries'
import { actions as mapActions } from 'state/ducks/map'

const options = {}

// devuelve cada id y title de config.layersGroup
getExplorer().forEach(({ id: idExplorer }) => {
  getExplorerOptions(idExplorer).forEach(({ id: idOption, options: opt }) => {
    options[idOption] = {}
    opt.forEach(({ id: idGroup, items }) => items.forEach(({ id, filter, invFilter }) => {
      options[idOption][id] = {
        isVisible: false,
        idGroup,
        filter,
        invFilter,
        processingId: null
      }
    }))
  })
})

const filterUpdate = (optionsState, idLayer, dispatch) => {
  const filters = []
  Object.keys(optionsState).map(
    (idOption) => Object.keys(optionsState[idOption]).forEach(
      (idItem) => {
        if (
          optionsState[idOption][idItem].isVisible
          && optionsState[idOption][idItem].filter !== undefined
          && optionsState[idOption][idItem].idGroup !== 'Area'
        ) {
          const { idGroup } = optionsState[idOption][idItem]
          // Se crea el idGroup en filters en caso que no exista
          const existLayer = filters.find((f) => f.idGroup === idGroup)
          if (existLayer === undefined) {
            filters.push(
              {
                idGroup,
                filter: []
              }
            )
          }
          filters.find((g) => g.idGroup === idGroup).filter.push(
            optionsState[idOption][idItem].filter
          )
          // Entre Area y Altura es criterio es OR por lo tanto se meten en el mismo grupo
          // TODO: mejorar solución
        } else if (
          optionsState[idOption][idItem].isVisible
          && optionsState[idOption][idItem].idGroup === 'Area'
        ) {
          const existLayer = filters.find((f) => f.idGroup === 'Altura')
          if (existLayer === undefined) {
            filters.push(
              {
                idGroup: 'Altura',
                filter: []
              }
            )
          }
          filters.find((g) => g.idGroup === 'Altura').filter.push(
            optionsState[idOption][idItem].filter
          )
        }
      }
    )
  )
  const layers = [
    {
      idLayer,
      groups: filters
    }
  ]

  dispatch(mapActions.filterUpdate({ layers }))
}

const checkChange = createAsyncThunk(
  'explorer/checkChange',
  async ({
    idLayer, idExplorer, itemId, isVisible
  }, { getState, dispatch }) => {
    filterUpdate(getState().explorer.options, idLayer, dispatch)
    return {
      idLayer, idExplorer, itemId, isVisible
    }
  },
  {
    condition: ({ idExplorer, itemId }, { getState }) => {
      const state = getState()
      const { processingId } = state.explorer.options[idExplorer][itemId]
      return state.map.isMapReady && processingId === null
    }
  }
)

const explorer = createSlice({
  name: 'explorer',
  initialState: {
    autoCompleteValue: [],
    filterHeighOptions: true,
    filterIncidenceOptions: false,
    options
  },
  reducers: {
    filterHeighOptions: (draftState, action) => {
      draftState.filterHeighOptions = action.payload
    },
    filterIncidenceOptions: (draftState, action) => {
      draftState.filterIncidenceOptions = action.payload
    },
    selectedValue: (draftState, action) => {
      draftState.autoCompleteValue = action.payload
    }
  },
  extraReducers: {
    [checkChange.pending]: (draftState, {
      meta: {
        requestId,
        arg: {
          idExplorer, itemId, isVisible
        }
      }
    }) => {
      draftState.options[idExplorer][itemId].isVisible = isVisible
      draftState.options[idExplorer][itemId].processingId = requestId
    },
    [checkChange.fulfilled]: (draftState, {
      meta: {
        arg: {
          idExplorer, itemId, isVisible
        }
      }
    }) => {
      draftState.options[idExplorer][itemId].isVisible = isVisible
      draftState.options[idExplorer][itemId].processingId = null
    },
    [checkChange.rejected]: (draftState, {
      meta: {
        arg: {
          idExplorer, itemId
        }
      }
    }) => {
      draftState.options[idExplorer][itemId].processingId = null
    }
  }
})

export default explorer.reducer

const actions = { ...explorer.actions, checkChange }
export { actions }
