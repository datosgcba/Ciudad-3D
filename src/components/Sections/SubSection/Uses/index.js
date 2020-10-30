import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, Grid, makeStyles, Paper
} from '@material-ui/core'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'

import { actions as usesActions } from 'state/ducks/uses'

import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'

const Details = ({
  classes, title, fill, afluencia, iconsData, decorators
}) => (
  <Box>
    <Box className={classes.card}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={decorators.bold}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography className={classes.gridText}>
            {fill}
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Grid container style={{ textAlign: 'center', marginBottom: 10 }}>
      {iconsData.map(({ iconTitle, svg }) => (
        <Grid item xs={Math.trunc(12 / iconsData.length)}>
          <Box className={classes.icon}>
            {svg}
          </Box>
          <Typography variant="body2" className={classes.gridTituloCategoria}>{iconTitle}</Typography>
          <Typography variant="body2">
            Afluencia
            <br />
            {afluencia}
          </Typography>
        </Grid>
      ))}
    </Grid>

  </Box>
)

const Uses = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const data = useSelector((state) => state.uses.data)
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.basicData.data.smp)
  const isLoading = useSelector((state) => state.uses.isLoading)

  useEffect(() => {
    dispatch(usesActions.clickOnParcel(smp))
  }, [dispatch, smp])
  return (
    <ContainerBar
      type="list"
    >
      {data
        && data.map(({
          id, title, desc, afluencia, iconsData
        }) => (
          <Details
            key={id}
            classes={classes}
            decorators={decorators}
            title={title}
            fill={desc}
            afluencia={afluencia}
            iconsData={iconsData}
          />
        ))}
      { data.length === 0 && !isLoading && (
        <Typography variant="body1" className={classes.body1}>
          <Paper className={classes.paper}>
            No hay datos disponibles
          </Paper>
        </Typography>
      )}
      { isLoading && (
        <Typography variant="body1" className={classes.body1}>
          Cargando...
        </Typography>
      )}
    </ContainerBar>
  )
}

Details.propTypes = {
  classes: PropTypes.objectOf(makeStyles).isRequired,
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  afluencia: PropTypes.string.isRequired,
  iconsData: PropTypes.string.isRequired
}
export default Uses
