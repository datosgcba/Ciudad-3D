import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { jsPDF } from 'jspdf'

const reportRequested = createAsyncThunk(
  'report/requested',
  async () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF()

    doc.text('Hello world!', 10, 10)
    doc.save('a4.pdf')
    return true
  }
)

const report = createSlice({
  name: 'report',
  initialState: {
    isProcessing: false,
    generated: []
  },
  extraReducers: {
    [reportRequested.pending]: (draftState) => {
      draftState.isLoading = true
    },
    [reportRequested.fulfilled]: (draftState) => {
      draftState.isLoading = false
    },
    [reportRequested.rejected]: (draftState) => {
      draftState.isLoading = false
    }
  }
})

export default report.reducer

const actions = { ...report.actions, reportRequested }
export { actions }
