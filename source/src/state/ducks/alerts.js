import { createSlice } from '@reduxjs/toolkit'

const alerts = createSlice({
  name: 'alerts',
  initialState: {
    ids: [],
    extraData: {}
  },
  reducers: {
    addId: (draftState, { payload: id }) => {
      draftState.ids.push(id)
    },
    addExtraData: (draftState, { payload: { id, titleSuffix } }) => {
      draftState.extraData[id] = draftState.extraData[id] ?? {}
      draftState.extraData[id].titleSuffix = titleSuffix
    },
    clear: (draftState) => {
      draftState.ids = []
      draftState.extraData = {}
    }
  }
})

export default alerts.reducer

const actions = { ...alerts.actions }
export { actions }
