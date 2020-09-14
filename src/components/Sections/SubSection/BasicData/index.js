import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, IconButton, Grid, makeStyles
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'

import { actions as categoriesActions } from 'state/ducks/categories'

import { useDispatch, useSelector } from 'react-redux'

import { getBasicData } from 'utils/configQueries'

import useStyles from './styles'

const Details = ({
  classes, decorators, title, fill, format
}) => (
  <Box className={classes.card}>
    <Grid container>
      <Grid item xs={7}>
        <Typography variant="subtitle1" className={decorators.bold}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={5} className={classes.gridItem}>
        <Typography variant="subtitle1" className={`${decorators.bold} ${classes.value}`}>
          {`${fill} ${format}`}
        </Typography>
      </Grid>
    </Grid>
  </Box>
)

const BasicData = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const data = useSelector((state) => state.basicData.data)
  const dispatch = useDispatch()

  return (
    <ContainerBar>
      <Typography variant="h5" className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_ml}`}>
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
          Datos Básicos
        </Typography>
      </Box>
      <Box className={classes.details}>
        {
          getBasicData().map(({ title, fill, format }) => (
            <Details
              key={title}
              classes={classes}
              decorators={decorators}
              title={title}
              fill={data[fill]}
              format={format}
            />
          ))
        }
      </Box>
    </ContainerBar>
  )
}

Details.propTypes = {
  classes: PropTypes.objectOf(makeStyles).isRequired,
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  fill: PropTypes.string,
  format: PropTypes.string.isRequired
}

Details.defaultProps = {
  fill: ''
}

export default BasicData
