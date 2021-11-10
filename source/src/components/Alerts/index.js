import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, Link
} from '@material-ui/core'

import { getAlert, getArticlesData } from 'utils/configQueries'

import { useDispatch, useSelector } from 'react-redux'

import useFontsStyles from 'theme/fontsDecorators'
import { actions as actionsAlert } from 'state/ducks/alerts'
import useStyles from './styles'
import StepAlerts from '../StepAlerts'

const Alert = ({ id, title, text }) => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const dispatch = useDispatch()

  const openModal = ({ articuloId }) => {
    dispatch(actionsAlert.isVisibleAlert({ isVisible: true, articuloId }))
  }

  const { titleSuffix, value } = useSelector((state) => state.alerts.extraData[id]) ?? {}

  text.matchAll(
    /(?:(?<textStart>.*?)\[(?<articulo>[^\]]+)\]\((?<articuloId>articuloId[s]{0,1}:[^)]+)\)|(?<textEnd>.+)$)/gm
  )

  const content = []

  const matches = text.includes('articuloId') ? text.matchAll(/(?:(?<textStart>.*?)\[(?<articulo>[^\]]+)\]\((?<articuloId>articuloId[s]{0,1}:[^)]+)\)|(?<textEnd>.+)$)/gm)
    : text.matchAll(/(?:(?<textStart>.*?)\[(?<link>[^\]]+)\]\((?<url>http[s]{0,1}:\/\/[^)]+)\)|(?<textEnd>.+)$)/gm)

  const processReplace = (contentText) => contentText.replace('{{value}}', value)
  // eslint-disable-next-line no-restricted-syntax
  for (const m of matches) {
    const {
      textStart, link, url, textEnd, articulo, articuloId
    } = m.groups
    if (content.length) {
      content.push(<br />)
    }
    content.push(processReplace(textStart || ''))
    // eslint-disable-next-line no-nested-ternary
    content.push(link
      ? (<Link href={url} className={classes.link} target="_blank" rel="noopener">{link}</Link>)
      : articuloId ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link href="#" className={classes.link} onClick={() => openModal({ articuloId: articuloId.slice(11) })} rel="noopener">{articulo}</Link>
      ) : '')
    content.push(processReplace(textEnd || ''))
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

  // coredor_alto - Av. Rivadavia 4655
  const isModalOpenAlert = useSelector((state) => state.alerts.showModalAlert)
  const idArticle = useSelector((state) => state.alerts.showModalAlertId)
  const data = getArticlesData(idArticle)

  return (
    <>
      {sectionId.length > 1 && sectionId[1] === 'Buildable' && (
        alertsIds
          .map(getAlert)
          .filter((alertData) => alertData)
          .map(({ id, title, text }) => (
            <Alert key={id} id={id} title={title} text={text} />
          ))
      )}
      <StepAlerts
        isModalOpenAlert={isModalOpenAlert}
        content={data ? data.content : []}
      />
    </>
  )
}

Alert.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Alerts
