import React from 'react'
import { Modal } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { actions as actionsAlert } from 'state/ducks/alerts'

import useStyles from './styles'

import img from '../../img/modal.png'

const StepAlerts = () => {
  const isModalOpenAlert = useSelector((state) => state.alerts.showModalAlert)
  const classes = useStyles()
  const dispatch = useDispatch()
  const closeModal = () => {
    dispatch((actionsAlert.isVisibleAlert(false)))
  }

  return (
    <Modal
      open={isModalOpenAlert}
      onClose={closeModal}
      className={classes.modal}
    >
      <div className={classes.modal}>
        <img src={img} alt="modal" />
      </div>
    </Modal>
  )
}

export default StepAlerts
