import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import emailjs from 'emailjs-com'

const sendEmail = createAsyncThunk(
  'contact/sendEmail',
  async ({ target }) => {
    // TODO: Usuario propio del gobierno
    // TODO: idUser y idTemplate deberian estar en el config
    const idUser = 'user_RVfYzsE2p9F5ySzITwsQK'
    const idTemplate = 'template_0mcaxro'
    const service = 'default_service'
    await emailjs.sendForm(service, idTemplate, target, idUser)
  }
)

const contact = createSlice({
  name: 'contact',
  initialState: {
    statusEmail: ''
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
