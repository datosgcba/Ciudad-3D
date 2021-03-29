import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, Link
} from '@material-ui/core'

import { getAlert } from 'utils/configQueries'

import { useSelector } from 'react-redux'

import useFontsStyles from 'theme/fontsDecorators'

import useStyles from './styles'

const Alert = ({ id, title, text }) => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const { titleSuffix } = useSelector((state) => state.alerts.extraData[id]) ?? {}

  const content = []
  const matches = text.matchAll(/(?:(?<textStart>.*?)\[(?<link>[^\]]+)\]\((?<url>http[s]{0,1}\:\/\/[^\)]+)\)|(?<textEnd>.+)$)/g)
  for (const m of matches) {
    const {
      textStart, link, url, textEnd
    } = m.groups
 		content.push(textStart || '')
 		content.push(link
      ? (<Link href={url} target="_blank" rel="noopener">{link}</Link>)
      : '')
 		content.push(textEnd || '')
  }
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
            {content}
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
