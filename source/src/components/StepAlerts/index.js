import React from 'react'
import {
  Modal, Typography, Box
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { actions as actionsAlert } from 'state/ducks/alerts'

import useStyles from './styles'

const StepAlerts = ({
  // eslint-disable-next-line react/prop-types
  isModalOpenAlert, content
}) => {
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
      <Box>
        {
        // eslint-disable-next-line react/prop-types
        content.map(({ title, text, image }) => (
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
            <img src={`./images/${image}`} alt="modal" />
          </Box>
        ))
}
      </Box>
    </Modal>
  )
}

export default StepAlerts
