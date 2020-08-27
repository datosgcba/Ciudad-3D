import { createSlice } from '@reduxjs/toolkit'

const seeker = createSlice({
  name: 'seeker',
  initialState: {
    place: ''
  },
  reducers: {
    placeSelected: (draftState, action) => {
      draftState.place = action.payload
      console.log(draftState.place)
    }
  }
})

export default seeker.reducer

const actions = { ...seeker.actions }
export { actions }
