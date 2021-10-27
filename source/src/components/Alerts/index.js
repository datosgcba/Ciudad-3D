import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, Link
} from '@material-ui/core'

import { getAlert } from 'utils/configQueries'

import { useDispatch, useSelector } from 'react-redux'

import useFontsStyles from 'theme/fontsDecorators'
import { actions as actionsAlert } from 'state/ducks/alerts'
import useStyles from './styles'

const Alert = ({ id, title, text }) => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const { titleSuffix, value } = useSelector((state) => state.alerts.extraData[id]) ?? {}

  const content = []
  const matches = text.matchAll(/(?:(?<textStart>.*?)\[(?<link>[^\]]+)\]\((?<url>http[s]{0,1}:\/\/[^)]+)\)|(?<textEnd>.+)$)/gm)

  const dispatch = useDispatch()

  const processReplace = (contentText) => contentText.replace('{{value}}', value)
  // eslint-disable-next-line no-restricted-syntax
  for (const m of matches) {
    const {
      textStart, link, url, textEnd
    } = m.groups
    if (content.length) {
      content.push(<br />)
    }
    content.push(processReplace(textStart || ''))
    content.push(link
      ? (<Link href={url} className={classes.link} target="_blank" rel="noopener">{link}</Link>)
      : '')
    content.push(processReplace(textEnd || ''))
  }

  const openModal = () => {
    dispatch(actionsAlert.isVisibleAlert(true))
  }

  return (
    <Box key={id} onClick={openModal} className={classes.box}>
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
      { sectionId.length > 1 && sectionId[1] === 'Buildable' && (
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
