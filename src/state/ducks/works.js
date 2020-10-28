import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// import { getWorks } from 'utils/apiConfig'

const clickOnParcel = createAsyncThunk(
  'works/clickOnParcel',
  async (smp) => {
    if (smp.length === undefined) {
      return { smp: 'Invalido' }
    }
    // const url = getBuildable(smp)
    // const response = await fetch(url)
    // .catch(() => rejectWithValue('algo salio mal'))
    // rejectWithValue
    // const data = (await response.json())
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    await delay(1000)
    // TODO: ! transformación de datos API a formato tabla
    const { obras_iniciadas: dataState } = {
      obras_iniciadas: [
        {
          type: 'worksStarted',
          data: [
            {
              id: 'Obra100',
              workData: [
                {
                  column: 'expte',
                  value: '1'
                },
                {
                  column: 'date',
                  value: '20-10-20'
                },
                {
                  column: 'workType',
                  value: '---'
                },
                {
                  column: 'sup',
                  value: '475 m²'
                },
                {
                  column: 'dest',
                  value: 'Comercio'
                }
              ]
            },
            {
              id: 'Obra200',
              workData: [
                {
                  column: 'expte',
                  value: '2'
                },
                {
                  column: 'date',
                  value: '24-10-20'
                },
                {
                  column: 'workType',
                  value: '---'
                },
                {
                  column: 'sup',
                  value: '175 m²'
                },
                {
                  column: 'dest',
                  value: 'Local'
                }
              ]
            }
          ]
        },
        {
          type: 'worksRegisters',
          data: [
            {
              id: 'Obra300',
              workData: [
                {
                  column: 'expte',
                  value: '3'
                },
                {
                  column: 'date',
                  value: '24-10-20'
                },
                {
                  column: 'workType',
                  value: '---'
                },
                {
                  column: 'sup',
                  value: '80 m²'
                },
                {
                  column: 'dest',
                  value: 'Vivienda'
                }
              ]
            },
            {
              id: 'Obra200',
              workData: [
                {
                  column: 'expte',
                  value: '4'
                },
                {
                  column: 'date',
                  value: '28-10-20'
                },
                {
                  column: 'workType',
                  value: '---'
                },
                {
                  column: 'sup',
                  value: '175 m²'
                },
                {
                  column: 'dest',
                  value: 'Comercio'
                }
              ]
            }
          ]
        },
        {
          type: 'urbanCertificates',
          data: [
            {
              id: 'Obra300',
              workData: [
                {
                  column: 'expte',
                  value: '5'
                },
                {
                  column: 'date',
                  value: '24-10-20'
                },
                {
                  column: 'workType',
                  value: '---'
                },
                {
                  column: 'sup',
                  value: '80 m²'
                },
                {
                  column: 'dest',
                  value: 'Vivienda'
                }
              ]
            },
            {
              id: 'Obra200',
              workData: [
                {
                  column: 'expte',
                  value: '6'
                },
                {
                  column: 'date',
                  value: '28-10-20'
                },
                {
                  column: 'workType',
                  value: '---'
                },
                {
                  column: 'sup',
                  value: '175 m²'
                },
                {
                  column: 'dest',
                  value: 'Comercio'
                }
              ]
            }
          ]
        }
      ]
    }
    // TODO: traer sólo lo necesario
    return dataState
  }
)

const works = createSlice({
  name: 'works',
  initialState: {
    isLoading: false,
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

export default works.reducer

const actions = { ...works.actions, clickOnParcel }
export { actions }
