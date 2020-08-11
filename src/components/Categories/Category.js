import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import {
  Box, SvgIcon, Typography, CardActionArea
} from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { CategorySelected } from 'store/actions'

import useStyles from './style'

const Icon = ({path , translate}) => {
  console.log(translate)
  return (
<SvgIcon fontSize="large">
      <circle cx="30" cy="30" r="9" />
      <path transform={translate} color="#d9d9d9" d={path} />
    </SvgIcon>
  )
}

const Category = ({ path, title, translate }) => {
  
  const sectionName = useSelector((state) => state.map.sectionName)

  const dispatch = useDispatch()

  const classes = useStyles()

  const isSelected = sectionName === title

  return (
    <CardActionArea onClick={() => dispatch(CategorySelected(title))} className={classes.option}>
      <Box className={isSelected ? classes.optionSelected : classes.optionUnSelected}>
        <Icon path={path} translate={translate} />
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
