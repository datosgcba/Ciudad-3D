import React from 'react'

import {
  Box, Typography
} from '@material-ui/core'

import { getAlert } from 'utils/configQueries'

import { useSelector } from 'react-redux'

import useStyles from './styles'

const Alerts = () => {
  const classes = useStyles()
  const alertsIds = useSelector((state) => state.alerts.ids)

  return (
    <>
      {
        alertsIds.map((id) => (
          <Box className={classes.box}>
            <Typography>
              {getAlert(id)}
            </Typography>
          </Box>
        ))
      }
    </>
  )
}

export default Alerts
