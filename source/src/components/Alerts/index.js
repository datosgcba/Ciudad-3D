import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography
} from '@material-ui/core'

import { getAlert } from 'utils/configQueries'

import { useSelector } from 'react-redux'

import useFontsStyles from 'theme/fontsDecorators'

import useStyles from './styles'

const Alert = ({ id, title, text }) => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const { titleSuffix } = useSelector((state) => state.alerts.extraData[id]) ?? {}

  return (
    <Box key={id} className={classes.box}>
      {
        title && (
          <Typography className={decorators.bold}>
            {title}
            {titleSuffix?.length ? ` - ${titleSuffix}` : ''}
          </Typography>
        )
      }
      {
        text && (
          <Typography>
            {text}
          </Typography>
        )
      }
    </Box>
  )
}
const Alerts = () => {
  const alertsIds = useSelector((state) => state.alerts.ids)
  const sectionId = useSelector((state) => state.categories.sectionId)

  return (
    <>
      { sectionId.length > 1 && (
        alertsIds
          .map(getAlert)
          .filter((alertData) => alertData)
          .map(({ id, title, text }) => (
            <Alert key={id} id={id} title={title} text={text} />
          ))
      )}
    </>
  )
}

Alert.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Alerts
