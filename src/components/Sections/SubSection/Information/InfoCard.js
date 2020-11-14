import React from 'react'

import { CardActionArea, Typography } from '@material-ui/core'

import { actions } from 'state/ducks/categories'
import { useDispatch } from 'react-redux'
import useFontsStyles from 'theme/fontsDecorators'

import PropTypes from 'prop-types'
import styles from './styles'

const InfoCard = ({
  id, title, description, color
}) => {
  const classes = styles()
  const decorators = useFontsStyles()
  const dispatch = useDispatch()

  return (
    <CardActionArea
      style={{ borderColor: color }}
      className={classes.card}
      onClick={() => dispatch(actions.sectionSelected(id))}
    >
      <Typography variant="h5" className={decorators.bold}>
        {title}
      </Typography>
      <Typography variant="body1" className={decorators.openSans}>
        {description}
      </Typography>
    </CardActionArea>
  )
}

InfoCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default InfoCard
