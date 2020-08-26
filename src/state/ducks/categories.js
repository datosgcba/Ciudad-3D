import { createSlice } from '@reduxjs/toolkit'

const categories = createSlice({
  name: 'categories',
  initialState: {
    sectionOpen: false,
    sectionId: []
  },
  reducers: {
    categorySelected: (draftState, action) => {
      if (action.payload === draftState.sectionId[0]) {
        draftState.sectionOpen = false
        draftState.sectionId = []
      } else {
        draftState.sectionOpen = true
        draftState.sectionId[0] = action.payload
      }
    }
  }
})

export default categories.reducer

const actions = { ...categories.actions }
export { actions }
