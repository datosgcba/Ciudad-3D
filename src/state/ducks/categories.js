import { createSlice } from '@reduxjs/toolkit'

const categories = createSlice({
  name: 'categories',
  initialState: {
    sectionOpen: false,
    sectionId: ''
  },
  reducers: {
    categorySelected: (draftState, action) => {
      draftState.sectionOpen = action.payload
      if (draftState.sectionOpen === draftState.sectionId) {
        draftState.sectionOpen = !draftState.sectionOpen
        draftState.sectionId = ''
      } else {
        draftState.sectionOpen = true
        draftState.sectionId = action.payload
      }
    }
  }
})

export default categories.reducer

const actions = { ...categories.actions }
export { actions }
