import { createSlice } from '@reduxjs/toolkit'

const seeker = createSlice({
  name: 'seeker',
  initialState: {
    place: '',
    coordinates: ''
  },
  reducers: {
    placeSelected: (draftState, action) => {
      draftState.place = action.payload
      console.log(draftState.place)
    },
    coordinatesSelected: (draftState, action) => {
      draftState.coordinates = action.payload
      console.log(draftState.coordinates)
    }
  }
})

export default seeker.reducer

const actions = { ...seeker.actions }
export { actions }
