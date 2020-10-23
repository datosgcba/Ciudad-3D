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
    const data = ['0001', '45466', '222', '222', '222']
    // TODO: traer sólo lo necesario
    return data
  }
)

const works = createSlice({
  name: 'works',
  initialState: {
    isLoading: false,
    lastIDCAll: '',
    data: {
      smp: null
    }
  },
  extraReducers: {
    // TODO: clickOnParcel.pending
    [clickOnParcel.pending]: (draftState) => {
      draftState.isLoading = true
      draftState.data = {}
    },
    [clickOnParcel.fulfilled]: (draftState, action) => {
      draftState.data = action.payload
      draftState.isLoading = false
    },
    [clickOnParcel.rejected]: (draftState) => {
      draftState.isLoading = false
      draftState.data = {}
    }
  }
})

export default works.reducer

const actions = { ...works.actions, clickOnParcel }
export { actions }
