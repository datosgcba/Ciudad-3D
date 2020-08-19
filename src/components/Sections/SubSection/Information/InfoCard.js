import React from 'react'

import { CardActionArea, Typography } from '@material-ui/core'

import { actions } from 'state/ducks/categories'
import { useDispatch } from 'react-redux'

import styles from './styles'

const InfoCard = ({ title, description }) => {
  const classes = styles()
  const dispatch = useDispatch()

  return (
    <CardActionArea
      className={classes.card}
      onClick={() => dispatch(actions.categorySelected(title))}
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

export default InfoCard
