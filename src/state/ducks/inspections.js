import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// import { getWorks } from 'utils/apiConfig'

const clickOnParcel = createAsyncThunk(
  'inspections/clickOnParcel',
  async (smp) => {
    if (smp.length === undefined) {
      return { smp: 'Invalido' }
    }
    // const url = getBuildable(smp)
    // const response = await fetch(url)
    // .catch(() => rejectWithValue('algo salio mal'))
    // rejectWithValue
    // const data = (await response.json())
    // TODO: ! integrar con API
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    await delay(1000)
    const dataState = [
      {
        type: 'ins',
        data: [
          {
            id: 'Obra100',
            inspectionData: [
              {
                column: 'workType',
                value: 'Establecimientos y Productos Alimenticios'
              },
              {
                column: 'sup',
                value: 'USPALLATA 3150'
              },
              {
                column: 'dest',
                value: '10/04/2018'
              }
            ]
          }
        ]
      },
      {
        type: 'certified',
        data: [
          {
            id: 'Obra300',
            inspectionData: [
              {
                column: 'workType',
                value: 'Establecimientos y Productos Alimenticios'
              },
              {
                column: 'sup',
                value: 'USPALLATA 3150'
              },
              {
                column: 'dest',
                value: '10/04/2018'
              }
            ]
          }
        ]
      }
    ]
    // TODO: traer sólo lo necesario
    return dataState
  }
)

const inspections = createSlice({
  name: 'inspections',
  initialState: {
    isLoading: false,
    data: []
  },
  extraReducers: {
    // TODO: clickOnParcel.pending
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

export default inspections.reducer

const actions = { ...inspections.actions, clickOnParcel }
export { actions }
