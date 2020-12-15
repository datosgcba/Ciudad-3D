import React from 'react'

import {
  Box, Typography
} from '@material-ui/core'

import { getAlert } from 'utils/configQueries'

import { useSelector } from 'react-redux'

import useFontsStyles from 'theme/fontsDecorators'

import useStyles from './styles'

const Alerts = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const alertsIds = useSelector((state) => state.alerts.ids)
  const sectionId = useSelector((state) => state.categories.sectionId)

  return (
    <>
      { sectionId.length > 1 && (
        alertsIds.map((id) => (
          <Box key={id} className={classes.box}>
            {
              getAlert(id).title && (
                <Typography className={decorators.bold}>
                  {getAlert(id).title}
                </Typography>
              )
            }
            <Typography>
              {getAlert(id).text}
            </Typography>
          </Box>
        ))
      )}
    </>
  )
}

export default Alerts
