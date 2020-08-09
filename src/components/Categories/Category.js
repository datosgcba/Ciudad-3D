import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import {
  Box, SvgIcon, Typography, CardActionArea,
} from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { CategorySelected } from 'store/actions'

import useStyles from './style'

const Icon = () => {
  const iconData = 'M10,1.75c-4.557,0-8.25,3.693-8.25,8.25c0,4.557,3.693,8.25,8.25,8.25c4.557,0,8.25-3.693,8.25-8.25C18.25,5.443,14.557,1.75,10,1.75 M10,17.382c-4.071,0-7.381-3.312-7.381-7.382c0-4.071,3.311-7.381,7.381-7.381c4.07,0,7.381,3.311,7.381,7.381C17.381,14.07,14.07,17.382,10,17.382 M7.612,10.869c-0.838,0-1.52,0.681-1.52,1.519s0.682,1.521,1.52,1.521c0.838,0,1.52-0.683,1.52-1.521S8.45,10.869,7.612,10.869 M7.612,13.039c-0.359,0-0.651-0.293-0.651-0.651c0-0.357,0.292-0.65,0.651-0.65c0.358,0,0.651,0.293,0.651,0.65C8.263,12.746,7.97,13.039,7.612,13.039 M7.629,6.11c-0.838,0-1.52,0.682-1.52,1.52c0,0.838,0.682,1.521,1.52,1.521c0.838,0,1.521-0.682,1.521-1.521C9.15,6.792,8.468,6.11,7.629,6.11M7.629,8.281c-0.358,0-0.651-0.292-0.651-0.651c0-0.358,0.292-0.651,0.651-0.651c0.359,0,0.651,0.292,0.651,0.651C8.281,7.988,7.988,8.281,7.629,8.281 M12.375,10.855c-0.838,0-1.521,0.682-1.521,1.52s0.683,1.52,1.521,1.52s1.52-0.682,1.52-1.52S13.213,10.855,12.375,10.855 M12.375,13.026c-0.358,0-0.652-0.294-0.652-0.651c0-0.358,0.294-0.652,0.652-0.652c0.357,0,0.65,0.294,0.65,0.652C13.025,12.732,12.732,13.026,12.375,13.026 M12.389,6.092c-0.839,0-1.52,0.682-1.52,1.52c0,0.838,0.681,1.52,1.52,1.52c0.838,0,1.52-0.681,1.52-1.52C13.908,6.774,13.227,6.092,12.389,6.092 M12.389,8.263c-0.36,0-0.652-0.293-0.652-0.651c0-0.359,0.292-0.651,0.652-0.651c0.357,0,0.65,0.292,0.65,0.651C13.039,7.97,12.746,8.263,12.389,8.263'

  return (
    <SvgIcon fontSize="large">
      <circle cx="12" cy="12" r="9" />
      <path transform="translate(2, 2)" color="white" d={iconData} />
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
  title: PropTypes.string.isRequired,
}

export default Category
