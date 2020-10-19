import { createSlice } from '@reduxjs/toolkit'

const explorer = createSlice({
  name: 'explorer',
  initialState: {
    filterHeighOptions: true,
    filterIncidenceOptions: true
  },
  reducers: {
    filterHeighOptions: (draftState, action) => {
      draftState.filterHeighOptions = action.payload
    },
    filterIncidenceOptions: (draftState, action) => {
      draftState.filterIncidenceOptions = action.payload
    }
  }
})

export default explorer.reducer

const actions = { ...explorer.actions }
export { actions }
