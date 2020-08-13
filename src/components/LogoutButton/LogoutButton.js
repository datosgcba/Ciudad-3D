import React from 'react'
import Button from '@material-ui/core/Button'
import { logout } from 'store_/actions/auth'

const LogoutButton = () => {
  const handleLogout = () => {
    logout()
    window.location.reload(false)
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        style={{ marginLeft: 5 }}
        onClick={() => { handleLogout() }}
      >
        Cerrar Sesion
      </Button>

      {/* {logged &&  (() => <Redirect to="/" />)} */}
    </div>
  )
}

export default LogoutButton
