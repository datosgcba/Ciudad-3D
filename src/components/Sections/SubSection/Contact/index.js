// TODO: console.log()
import React, { useState } from 'react'

import { actions as actionsContact } from 'state/ducks/contact'

import { useDispatch, useSelector } from 'react-redux'

import ReCAPTCHA from 'react-google-recaptcha'

import ContainerBar from 'components/Sections/ContainerBar'

import {
  Grid, Typography, Button, TextField
} from '@material-ui/core'
import useStyles from './styles'

const Contact = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  // Validaciones
  const [nameValue, setNameValue] = useState('')
  const nameChange = (value) => {
    setNameValue(value)
  }
  const [emailValue, setEmailValue] = useState('')
  const emailChange = (value) => {
    setEmailValue(value)
  }
  const [comentValue, setComentValue] = useState('')
  const comentChange = (value) => {
    setComentValue(value)
  }

  const resetValues = () => {
    setNameValue('')
    setEmailValue('')
    setComentValue('')
  }

  const [errorName, setErrorName] = useState(false)
  const [errorMail, setErrorMail] = useState(false)
  const [errorComent, setErrorComent] = useState(false)

  const validate = () => {
    const values = {}
    values.nameValue = nameValue !== ''
      ? ['correct', setErrorName(false)] : ['incorrect', setErrorName(true)]
    values.emailValue = (/\S+@\S+\.\S+/).test(emailValue)
      ? ['correct', setErrorMail(false)] : ['incorrect', setErrorMail(true)]
    values.comentValue = comentValue !== ''
      ? ['correct', setErrorComent(false)] : ['incorrect', setErrorComent(true)]

    return Object.values(values).every((v) => v[0] === 'correct')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      dispatch(actionsContact.sendEmail({ target: e.target }))
      resetValues()
    }
  }

  const statusEmail = useSelector((state) => state.contact.statusEmail)
  return (
    <ContainerBar
      type="list"
    >
      <form onSubmit={handleSubmit}>
        <Grid container className={classes.container}>
          <Grid item className={classes.item}>
            <TextField
              id="name"
              name="userName"
              label="Nombre *"
              value={nameValue}
              onChange={({ target: { value } }) => nameChange(value)}
              error={errorName}
              helperText={errorName && 'Ingrese su nombre'}
            />
          </Grid>
          <Grid item className={classes.item}>
            <TextField
              id="email"
              name="userEmail"
              label="Email *"
              value={emailValue}
              onChange={({ target: { value } }) => emailChange(value)}
              error={errorMail}
              helperText={errorMail && (emailValue === '' ? 'Ingrese un email' : 'Ingrese un email valido')}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-multiline-static"
              name="coment"
              label="Comentario *"
              multiline
              rows={10}
              variant="outlined"
              value={comentValue}
              onChange={({ target: { value } }) => comentChange(value)}
              error={errorComent}
              helperText={errorComent && 'Ingrese un comentario'}
            />
          </Grid>
          <Grid item className={classes.item}>
            <Typography className={classes.asterisco}>
              * los campos son obligatorios
            </Typography>
          </Grid>
          <Grid item className={classes.item}>
            <ReCAPTCHA
              sitekey="6LdVAuMZAAAAADGeupnkf5fB37bNhbxah0asbDkX"
              name="captcha"
            />
          </Grid>
          <Grid item className={classes.item}>
            <Button
              variant="contained"
              type="submit"
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>

      {
        statusEmail === 'sending' && (
          <Typography>
            ENVIANDO
          </Typography>
        )
      }
      {
        statusEmail === 'success' && (
          <Typography>
            ENVIADO CON ÉXITO
          </Typography>
        )
      }
      {
        statusEmail === 'fail' && (
          <Typography className={classes.asterisco}>
            ERROR EL ENVIAR
          </Typography>
        )
      }
    </ContainerBar>
  )
}

export default Contact
