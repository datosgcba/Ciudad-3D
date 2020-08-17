import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, SvgIcon, Typography, CardActionArea
} from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'state/ducks/categories'

import useStyles from './style'

const Icon = ({ path }) => (
  <SvgIcon fontSize="medium" component="div">
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
      <Box className={isSelected ? classes.optionSelected : classes.optionUnSelected}>
        <Icon path={path} />
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
  path: PropTypes.string.isRequired
}

export default Category
