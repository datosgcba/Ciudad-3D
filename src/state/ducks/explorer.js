import { createSlice } from '@reduxjs/toolkit'

const explorer = createSlice({
  name: 'explorer',
  initialState: {
    autoCompleteValue: [
      {
        id: 'Height',
        title: 'Alturas Código Urbanístico'
      }
    ],
    filterHeighOptions: true,
    filterIncidenceOptions: false
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
  }
})

export default explorer.reducer

const actions = { ...explorer.actions }
export { actions }
