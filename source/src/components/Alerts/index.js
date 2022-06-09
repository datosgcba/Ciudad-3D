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

  const { titleSuffix, value, value2 } = useSelector((state) => state.alerts.extraData[id]) ?? {}

  const textAux = text?.replace('{{value2}}', value2 ?? '')

  textAux.matchAll(
    /(?:(?<textStart>.*?)\[(?<articulo>[^\]]+)\]\((?<articuloId>articuloId[s]{0,1}:[^)]+)\)|(?<textEnd>.+)$)/gm
  )

  const content = []

  const processReplace = (contentText) => contentText.replace('{{value}}', value)

  const matches = textAux.matchAll(/(?:(?<textStart>.*?)\[(?<link>[^\]]+)\]\((?:(?<articuloId>articuloId[s]{0,1}:[^)]+)|(?<url>http[s]{0,1}:\/\/[^)]+))\)|(?<textEnd>.+)$)/gm)

  // eslint-disable-next-line no-restricted-syntax
  for (const m of matches) {
    const {
      textStart, link, url, textEnd, articuloId
    } = m.groups
    if (content.length) {
      content.push(<br />)
    }
    content.push(processReplace(textStart || ''))
    if (articuloId) {
      const textArticle = processReplace(link)
      content.push(
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link href="#" className={classes.link} onClick={() => openModal({ articuloId: articuloId.slice(11) })} rel="noopener">{textArticle}</Link>
      )
    }
    if (link && !articuloId) {
      const textLink = processReplace(link)
      const urlLink = processReplace(url || '')
      content.push(value2 === 'DISABLED' ? textLink : <Link href={urlLink} className={classes.link} target="_blank" rel="noopener">{textLink}</Link>)
    }
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
        textAux && (
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
