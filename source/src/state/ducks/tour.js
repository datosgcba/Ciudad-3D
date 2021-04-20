import { createSlice } from '@reduxjs/toolkit'

const tour = createSlice({
  name: 'tour',
  initialState: {
    showModal: false
  },
  reducers: {
    isVisibleTour: (draftState, { payload }) => {
      draftState.showModal = payload
    }
  }
})

export default tour.reducer

const actions = { ...tour.actions }
export { actions }
