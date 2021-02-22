import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getExplorer, getExplorerOptions } from 'utils/configQueries'
import { actions as mapActions } from 'state/ducks/map'

const loadExplorerOptions = createAsyncThunk(
  'map/loadExplorerOptions',
  async () => {
    const options = {}
    // devuelve cada id y title de config.layersGroup
    getExplorer().forEach(({ id: idExplorer }) => {
      getExplorerOptions(idExplorer).forEach(({ id: idOption, options: opt }) => {
        options[idOption] = {}
        opt.forEach(({ id: idGroup, items }) => items.forEach(({ id, filter }) => {
          options[idOption][id] = {
            isVisible: true,
            idGroup,
            filter,
            processingId: null
          }
        }))
      })
    })
    return { options }
  }
)

// Esta funcón rebuscada se resume en ¿algún grupo de los visibles tiene cero tildes?
const hasGroupWithEmtpyFilter = ({ optionsState, autoCompleteValue }) => autoCompleteValue
  .some(
    ({ filterId }) => {
      let area = 0
      const groupsCount = Object.values(optionsState[filterId])
        .reduce(
          (groups, { idGroup, isVisible }) => {
            let { [idGroup]: group = 0 } = groups
            if (idGroup !== 'Area') {
              group += isVisible ? 1 : 0
            } else {
              group += 1
              area += isVisible ? 1 : 0
            }
            return { ...groups, [idGroup]: group }
          },
          {}
        )
      // Entre Altura y Area el criterio es AND por esto se evaluan en un mismo grupo
      groupsCount.Altura += area
      return Object.values(groupsCount).some((count) => count === 0)
    }
  )

const refreshFilter = (optionsState, autoCompleteValue, idLayer, dispatch) => {
  const filters = []
  // Cuando un grupo de filtros visibles esta completamente destildado, la capa queda oculta
  if (hasGroupWithEmtpyFilter({ optionsState, autoCompleteValue })) {
    filters.push({
      idGroup: 'emptyGroup',
      filter: [['==', '1', '2']]
    })
  } else {
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
            // Entre Área y Altura el criterio es OR por lo tanto se juntan en el mismo grupo
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
  }
  const layers = [
    {
      idLayer,
      groups: filters
    }
  ]

  dispatch(mapActions.filterUpdate({ layers }))
  return layers
}

const refreshFilterRequest = createAsyncThunk(
  'explorer/refreshFilterRequest',
  async ({ idLayer }, { getState, dispatch }) => {
    const { explorer: { options: optionsState, autoCompleteValue } } = getState()
    const layersFilters = refreshFilter(optionsState, autoCompleteValue, idLayer, dispatch)
    return layersFilters
  }
)

const checkChange = createAsyncThunk(
  'explorer/checkChange',
  async ({
    idLayer
  }, { dispatch }) => {
    dispatch(refreshFilterRequest({ idLayer }))
  },
  {
    condition: ({ idExplorer, itemId }, { getState }) => {
      const state = getState()
      const { processingId } = state.explorer.options[idExplorer][itemId]
      return state.map.isMapReady && processingId === null
    }
  }
)

const allSelected = createAsyncThunk(
  'explorer/allSelected',
  async ({ idExp, idG }, { getState }) => {
    const optionsUpdated = { ...getState().explorer.options }

    const itemsChange = []
    Object.keys(optionsUpdated[idExp]).forEach(
      (item) => {
        if (optionsUpdated[idExp][item].idGroup === idG) {
          itemsChange.push(item)
        }
      }
    )
    return { itemsChange }
  }
)

const explorer = createSlice({
  name: 'explorer',
  initialState: {
    autoCompleteValue: [],
    filterHeighOptions: true,
    filterIncidenceOptions: false,
    options: {},
    layersFilters: null
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
    [refreshFilterRequest.fulfilled]: (draftState, { payload }) => {
      draftState.layersFilters = payload
    },
    [checkChange.rejected]: (draftState, {
      meta: {
        arg: {
          idExplorer, itemId
        }
      }
    }) => {
      draftState.options[idExplorer][itemId].processingId = null
    },
    [allSelected.fulfilled]: (draftState, {
      meta: {
        arg: { idExp, isSelected }
      }, payload: { itemsChange }
    }) => {
      itemsChange.forEach(
        (item) => {
          draftState.options[idExp][item].isVisible = isSelected
          return null
        }
      )
    },
    [loadExplorerOptions.fulfilled]: (draftState, {
      payload: { options }
    }) => {
      draftState.options = options
    }
  }
})

export default explorer.reducer

const actions = {
  ...explorer.actions, checkChange, refreshFilterRequest, allSelected, loadExplorerOptions
}
export { actions }
