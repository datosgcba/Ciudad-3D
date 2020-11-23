import React, { useState } from 'react'

import ReCAPTCHA from 'react-google-recaptcha'

import ContainerBar from 'components/Sections/ContainerBar'

import {
  Grid, Typography, Button, TextField
} from '@material-ui/core'
import useStyles from './styles'

const Contact = () => {
  const classes = useStyles()

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

  const [errorName, setErrorName] = useState(false)

  const validate = () => {
    const values = {}
    if (nameValue !== '') {
      setErrorName(false)
    } else {
      setErrorName(true)
    }
    values.nameValue = nameValue !== '' ? 'correct' : 'Ingrese su nombre'
    values.emailValue = (/\S+@\S+\.\S+/).test(emailValue) ? 'correct' : 'Ingrese un email valido'
    values.comentValue = comentValue !== '' ? 'correct' : 'Ingrese un comentario más especifico'

    return Object.values(values).every((v) => v === 'correct')
  }
  const handleSubmit = () => {
    if (validate()) {
      console.log('validate OK')
    } else {
      console.log('validate FAIL')
    }
  }

  return (
    <ContainerBar
      type="list"
    >
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item className={classes.item}>
            <TextField
              id="name"
              label="Nombre *"
              value={nameValue}
              onChange={({ target: { value } }) => nameChange(value)}
              // eslint-disable-next-line react/jsx-props-no-spreading
              error={errorName && true}
              helperText={errorName && 'Ingrese su nombre'}
            />
          </Grid>
          <Grid item className={classes.item}>
            <TextField
              id="email"
              label="Email *"
              value={emailValue}
              onChange={({ target: { value } }) => emailChange(value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-multiline-static"
              label="Comentario *"
              multiline
              rows={10}
              variant="outlined"
              value={comentValue}
              onChange={({ target: { value } }) => comentChange(value)}
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
    </ContainerBar>
  )
}

export default Contact
