import React from 'react'
import {
  Modal, Box, List, ListItemText
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
    dispatch((actionsAlert.isVisibleAlert({ isVisible: false })))
  }

  return (
    <Modal
      open={isModalOpenAlert}
      onClose={closeModal}
      className={classes.modal}
    >
      <Box className={classes.containerList}>
        <List>
          {
            // eslint-disable-next-line react/prop-types
            content.map(({ title, text, image }) => (
              <Box>
                <ListItemText className={classes.title} primary={title} />
                <ListItemText className={classes.text} primary={text} />
                {image && <img src={`./images/${image}`} alt="Artículo" />}
              </Box>
            ))
          }
        </List>
      </Box>
    </Modal>
  )
}

export default StepAlerts
