import React from 'react'

import { CardActionArea, Typography } from '@material-ui/core'

import { actions } from 'state/ducks/categories'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'
import styles from './styles'

const InfoCard = ({ id, title, description }) => {
  const classes = styles()
  const dispatch = useDispatch()

  return (
    <CardActionArea
      className={classes.card}
      onClick={() => dispatch(actions.categorySelected(id))}
    >
      <Typography className={classes.cardTitulo}>
        {title}
      </Typography>
      <Typography className={classes.cardCuerpo}>
        {description}
      </Typography>
    </CardActionArea>
  )
}

InfoCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default InfoCard
