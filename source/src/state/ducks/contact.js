import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import emailjs from 'emailjs-com'

const sendEmail = createAsyncThunk(
  'contact/sendEmail',
  async ({ target }) => {
    const idUser = 'user_kVZsZRVybx51UgIrwaFG8'
    // const idTemplateTest = 'test_lopezgonzalo'
    const serviceTest = 'test_lopezgonzalo'
    const idTemplate = 'consultas_ssregic'
    await emailjs.sendForm(serviceTest, idTemplate, target, idUser)
  }
)

const contact = createSlice({
  name: 'contact',
  initialState: {
    statusEmail: ''
  },
  reducers: {
    cleanStatus: (draftState) => {
      draftState.statusEmail = ''
    }
  },
  extraReducers: {
    [sendEmail.pending]: (draftState) => {
      draftState.statusEmail = 'sending'
    },
    [sendEmail.fulfilled]: (draftState) => {
      draftState.statusEmail = 'success'
    },
    [sendEmail.rejected]: (draftState) => {
      draftState.statusEmail = 'fail'
    }
  }
})

export default contact.reducer

const actions = { ...contact.actions, sendEmail }
export { actions }
