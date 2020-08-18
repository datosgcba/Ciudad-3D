import { createSlice } from '@reduxjs/toolkit'

const categories = createSlice({
  name: 'categories',
  initialState: {
    sectionOpen: true,
    sectionName: 'Edificabilidad'
  },
  reducers: {
    categorySelected: (draftState, action) => {
      draftState.sectionOpen = action.payload === draftState.sectionName
        ? !draftState.sectionOpen
        : true
      draftState.sectionName = action.payload
    }
  }
})

export default categories.reducer

const actions = { ...categories.actions }
export { actions }
