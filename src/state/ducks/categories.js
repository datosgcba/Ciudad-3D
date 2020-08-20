import { createSlice } from '@reduxjs/toolkit'

const categories = createSlice({
  name: 'categories',
  initialState: {
    sectionOpen: false,
    sectionId: ''
  },
  reducers: {
    categorySelected: (draftState, action) => {
      draftState.sectionOpen = action.payload === draftState.sectionId
        ? !draftState.sectionOpen
        : true
      draftState.sectionId = action.payload
    }
  }
})

export default categories.reducer

const actions = { ...categories.actions }
export { actions }
