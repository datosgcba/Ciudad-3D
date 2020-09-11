import React from 'react'

import PropTypes from 'prop-types'

import {
  SvgIcon, Typography, CardActionArea
} from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'state/ducks/categories'

import useStyles from './styles'

const Icon = ({ className, path, isSelected }) => (
  <SvgIcon className={className} component="div" color={isSelected ? 'primary' : 'disabled'}>
    { path }
  </SvgIcon>
)

const Category = ({ id, path, title }) => {
  const sectionName = useSelector((state) => (state.categories.sectionId.length === 0
    ? null
    : state.categories.sectionId[0]))

  const dispatch = useDispatch()

  const classes = useStyles()

  const isSelected = sectionName === id

  return (
    <CardActionArea
      onClick={() => dispatch(actions.categorySelected(id))}
      className={classes.option}
    >
      <Icon className={classes.icon} path={path} isSelected={isSelected} />
      <Typography variant="caption">{title}</Typography>
    </CardActionArea>
  )
}

Category.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.objectOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired
}

Icon.propTypes = {
  className: PropTypes.string.isRequired,
  path: PropTypes.objectOf(PropTypes.any).isRequired,
  isSelected: PropTypes.bool.isRequired
}

export default Category
