import React from 'react'
import { Modal, Typography, Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { actions as actionsAlert } from 'state/ducks/alerts'

import useStyles from './styles'

import img from '../../img/modal.png'

// eslint-disable-next-line react/prop-types
const StepAlerts = ({ id, title, text }) => {
  const isModalOpenAlert = useSelector((state) => state.alerts.showModalAlert)
  const classes = useStyles()
  const dispatch = useDispatch()
  const closeModal = () => {
    dispatch((actionsAlert.isVisibleAlert(false)))
    console.log(id)
  }

  return (
    <Modal
      open={isModalOpenAlert}
      onClose={closeModal}
      className={classes.modal}
    >
      <Box>
        <Typography
          className={classes.title}
          variant="h5"
        >
          {title}
        </Typography>

        <Typography
          className={classes.text}
          variant="h6"
        >
          {text}
        </Typography>
        <img src={img} alt="modal" />
      </Box>
    </Modal>
  )
}

export default StepAlerts
