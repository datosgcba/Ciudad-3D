import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, SvgIcon, Typography, CardActionArea
} from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'state/ducks/categories'

import useStyles from './style'

const Icon = ({ path, isSelected }) => (
  <SvgIcon fontSize="medium" component="div" color={isSelected ? 'primary' : 'disabled'}>
    { path }
  </SvgIcon>
)

const Category = ({ id, path, title }) => {
  const sectionName = useSelector((state) => state.categories.sectionId.length === 0 ? null : state.categories.sectionId[0])

  const dispatch = useDispatch()

  const classes = useStyles()

  const isSelected = sectionName === id

  return (
    <CardActionArea
      onClick={() => dispatch(actions.categorySelected(id))}
      className={classes.option}
    >
      <Box>
        <Icon path={path} isSelected={isSelected} />
      </Box>
      <Box>
        <Typography variant="caption">{title}</Typography>
      </Box>
    </CardActionArea>
  )
}

Category.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

Icon.propTypes = {
  path: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired
}

export default Category
