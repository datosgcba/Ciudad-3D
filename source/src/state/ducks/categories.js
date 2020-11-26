import { createSlice } from '@reduxjs/toolkit'

const categories = createSlice({
  name: 'categories',
  initialState: {
    sectionOpen: false,
    sectionId: ['']
  },
  reducers: {
    categorySelected: (draftState, { payload }) => {
      if (payload === draftState.sectionId[0]) {
        draftState.sectionOpen = false
        draftState.sectionId = ['']
      } else {
        draftState.sectionOpen = true
        draftState.sectionId = ['']
        draftState.sectionId[0] = payload
      }
    },
    sectionSelected: (draftState, { payload }) => {
      draftState.sectionId.push(payload)
    },
    sectionBack: (draftState) => {
      draftState.sectionId.pop()
    }
  }
})

export default categories.reducer

const actions = { ...categories.actions }
export { actions }
