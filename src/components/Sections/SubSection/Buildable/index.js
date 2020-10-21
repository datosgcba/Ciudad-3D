/* eslint-disable */
import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import {
  Box,
  Typography,
  Grid,
  IconButton
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'

import { actions as buildableActions } from 'state/ducks/buildable'
import { actions as categoriesActions } from 'state/ducks/categories'

import { useDispatch, useSelector } from 'react-redux'

import { getBuildable } from 'utils/configQueries'

import useStyles from './styles'

const Details = ({
  classes, title, fill, fillDos, fillTres, format, decorators
}) => (
  <Box className={classes.subDetails}>
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="subtitle3" className={decorators.bold}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Typography variant="subtitle1" className={`${classes.value}`}>
          {fill}
          {fillDos} 
          {fillTres}
          {format}
        </Typography>
      </Grid>
    </Grid>
  </Box>
)

const Buildable = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const data = useSelector((state) => state.buildable.data)
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.basicData.data.smp)
  useEffect(() => {
    dispatch(buildableActions.clickOnParcel(smp))
  }, [dispatch, smp])
  return (
    <ContainerBar>
      <Typography
        variant="h5"
        className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_xl}`}
      >
        Información
      </Typography>
      <Box className={classes.subTitle}>
        <Typography variant="h6" className={decorators.bold}>
          <IconButton
            onClick={() => dispatch(categoriesActions.sectionBack())}
            className={classes.button}
          >
            <ArrowBackIcon />
          </IconButton>
          Edificabilidad
        </Typography>
      </Box>
      {
          getBuildable().map(({ title, fill, fillDos, fillTres, format }, index) => (
            <Details
              key={index}
              classes={classes}
              decorators={decorators}
              title={title}
              fill={data[fill]}
              fillDos={data[fillDos]}
              fillTres={data[fillTres]}
              format={format}
            />
          ))
        }
    </ContainerBar>
  )
}

Details.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.object).isRequired,
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  fill: PropTypes.string,
  fillDos: PropTypes.string,
  fillTres: PropTypes.string,
  format: PropTypes.string.isRequired
}

Details.defaultProps = {
  fill: '',
  fillDos: '',
  fillTres:''
}

export default Buildable
