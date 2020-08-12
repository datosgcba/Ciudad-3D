import axios from 'axios'
import * as actionTypes from './actionTypes'

const dotenv = require('dotenv')

const milisegundos = 500
const session_min_duration = (3600 * milisegundos) // media hora
dotenv.config()

export const authStart = () => ({
  type: actionTypes.AUTH_START
})

export const authSuccess = (token) => ({
  type: actionTypes.AUTH_SUCCESS,
  token
})

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error
})

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  axios
    .post(`${process.env.REACT_APP_DJANGO_BASEURL}/rest-auth/logout/`)
    .then()
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(authCheckState())
  }, expirationTime * milisegundos)
}

export const updateTimeout = (expirationTime) => {
  const new_expiration_date = new Date(new Date().getTime() + session_min_duration)
  localStorage.setItem('expirationDate', new_expiration_date)
}

export const authLogin = (username, password) => (dispatch) => {
  dispatch(authStart())
  axios
    .post(`${process.env.REACT_APP_DJANGO_BASEURL}/rest-auth/login/`, {
      username,
      password
    })
    .then((res) => {
      const token = res.data.key
      const expirationDate = new Date(new Date().getTime() + session_min_duration)
      localStorage.setItem('token', token)
      localStorage.setItem('expirationDate', expirationDate)
      dispatch(authSuccess(token))
      dispatch(checkAuthTimeout(3600))
    })
    .catch((err) => {
      dispatch(authFail(err))
    })
}

export const authSignup = (username, email, password1, password2) => (dispatch) => {
  dispatch(authStart())
  axios
    .post(`${process.env.REACT_APP_DJANGO_BASEURL}/rest-auth/registration/`, {
      username,
      email,
      password1,
      password2
    })
    .then((res) => {
      const token = res.data.key
      const expirationDate = new Date(new Date().getTime() + 3600 * milisegundos)
      localStorage.setItem('token', token)
      localStorage.setItem('expirationDate', expirationDate)
      dispatch(authSuccess(token))
      // dispatch(checkAuthTimeout(3600));
    })
    .catch((err) => {
      dispatch(authFail(err))
    })
}

export const authCheckState = () => {
  console.log('=== checkstate ===', new Date())
  return (dispatch) => {
    const token = localStorage.getItem('token')
    if (token === undefined) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / milisegundos
          )
        )
      }
    }
  }
}
