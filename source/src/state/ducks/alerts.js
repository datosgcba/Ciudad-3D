import { createSlice } from '@reduxjs/toolkit'

const alerts = createSlice({
  name: 'alerts',
  initialState: {
    ids: []
  },
  reducers: {
    addId: (draftState, action) => {
      draftState.ids.push(action.payload)
    },
    clear: (draftState) => {
      draftState.ids = []
    }
  }
})

export default alerts.reducer

const actions = { ...alerts.actions }
export { actions }
