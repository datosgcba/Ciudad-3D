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

const Category = ({ path, title }) => {
  const sectionName = useSelector((state) => state.categories.sectionName)

  const dispatch = useDispatch()

  const classes = useStyles()

  const isSelected = sectionName === title

  return (
    <CardActionArea
      onClick={() => dispatch(actions.categorySelected(title))}
      className={classes.option}
    >
      <Box>
        <Icon path={path} isSelected={isSelected} />
      </Box>
      <Box>
        <Typography variant="caption" color="textPrimary">{title}</Typography>
      </Box>
    </CardActionArea>
  )
}

Category.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

Icon.propTypes = {
  path: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired
}

export default Category
