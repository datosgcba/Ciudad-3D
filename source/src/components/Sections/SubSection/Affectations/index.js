import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, Grid, makeStyles, Paper
} from '@material-ui/core'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'
import SelectParcel from 'components/Sections/SubSection/SelectParcel'

import { actions as affectationsActions } from 'state/ducks/affectations'

import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'

const Details = ({
  classes, title, subtitle, fill, decorators
}) => (

  <Box>
    <Box className={classes.card}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle2" className={decorators.bold}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2">
            {subtitle}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="body2" className={classes.gridText}>
            {fill}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Box>
)

const Affectations = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const data = useSelector((state) => state.affectations.data)
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.parcel.smp)
  const isLoading = useSelector((state) => state.affectations.isLoading)

  useEffect(() => {
    dispatch(affectationsActions.clickOnParcel(smp))
  }, [dispatch, smp])
  return (
    <ContainerBar
      type="list"
    >
      {!isLoading && smp && data
        && data.map(({
          id, title, subtitle, desc
        }) => (
          <Details
            key={id}
            classes={classes}
            decorators={decorators}
            subtitle={subtitle}
            title={title}
            fill={desc}
          />
        ))}
      { !isLoading && smp && data && data.length === 0 && (
        <Typography variant="body1" className={classes.body1}>
          No posee afectaciones
        </Typography>
      )}
      { smp && data === null && !isLoading && (
        <Paper className={classes.paper}>
          <Typography variant="body1" className={classes.body1}>
            No hay datos disponibles
          </Typography>
        </Paper>
      )}
      { isLoading && (
        <Typography variant="body1" className={classes.body1}>
          Cargando...
        </Typography>
      )}
      { !isLoading && !smp && <SelectParcel />}
    </ContainerBar>
  )
}

Details.propTypes = {
  classes: PropTypes.objectOf(makeStyles).isRequired,
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  fill: PropTypes.string
}
Details.defaultProps = {
  fill: ''
}

export default Affectations
