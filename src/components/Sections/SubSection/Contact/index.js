import React from 'react'

import ReCAPTCHA from 'react-google-recaptcha'

import ContainerBar from 'components/Sections/ContainerBar'

import { Typography } from '@material-ui/core'
import useStyles from './styles'

const Contact = () => {
  const classes = useStyles()

  return (
    <ContainerBar
      type="list"
    >
      <form>
        <Typography className={classes.label}>
          NOMBRE:
        </Typography>
        <Typography className={classes.asterisco}>* </Typography>
        <input
          className={classes.field}
          type="text"
          required
        />
        <Typography className={classes.label}>
          EMAIL:
        </Typography>
        <Typography className={classes.asterisco}>*</Typography>
        <input
          className={classes.field}
          type="email"
          required
        />
        <Typography className={classes.label}>
          COMENTARIOS:
        </Typography>
        <Typography className={classes.asterisco}>*</Typography>
        <textarea
          className={classes.textArea}
          required
          resize="none"
        />
        <Typography className={classes.asterisco}>* los campos son obligatorios</Typography>
        <ReCAPTCHA
          className={classes.captcha}
          sitekey="6LdVAuMZAAAAADGeupnkf5fB37bNhbxah0asbDkX"
        />
        <input
          className={classes.button}
          type="submit"
          value="Enviar"
        />
      </form>
    </ContainerBar>
  )
}

export default Contact
