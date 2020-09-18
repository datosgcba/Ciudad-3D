import { createSlice } from '@reduxjs/toolkit'

const seeker = createSlice({
  name: 'seeker',
  initialState: {
    place: { data: { smp: null } },
    coordinates: null
  },
  reducers: {
    placeSelected: (draftState, action) => {
      draftState.place = action.payload
    },
    coordinatesSelected: (draftState, action) => {
      draftState.coordinates = action.payload
    }
  }
})

export default seeker.reducer

const actions = { ...seeker.actions }
export { actions }
