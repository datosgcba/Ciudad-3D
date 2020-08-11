import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import {
  Box, SvgIcon, Typography, CardActionArea
} from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { CategorySelected } from 'store/actions'

import useStyles from './style'

const Icon = ({path}) => {
  console.log(path)
  return (
<SvgIcon fontSize="medium" component="div">
     {path}
    </SvgIcon>
  )
}

const Category = ({ path, title }) => {
  
  const sectionName = useSelector((state) => state.map.sectionName)

  const dispatch = useDispatch()

  const classes = useStyles()

  const isSelected = sectionName === title

  return (
    <CardActionArea onClick={() => dispatch(CategorySelected(title))} className={classes.option}>
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

export default Category
