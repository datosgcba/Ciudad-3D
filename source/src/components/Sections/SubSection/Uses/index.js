import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, Grid, makeStyles, Link
} from '@material-ui/core'
import useFontsStyles from 'theme/fontsDecorators'

import { useDispatch, useSelector } from 'react-redux'

import ContainerBar from 'components/Sections/ContainerBar'
import SelectParcel from 'components/Sections/SubSection/SelectParcel'

import icons from 'utils/svgIcons'

import { getAlert, getUsesLink } from 'utils/configQueries'

import { actions as usesActions } from 'state/ducks/uses'

import useStyles from './styles'

const Details = ({
  classes, title, fill, afluencia, iconsData, decorators
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
          <Typography variant="caption">
            {fill}
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Grid container style={{ textAlign: 'center', marginBottom: 10 }}>
      {iconsData.map(({ iconTitle, svgId }) => (
        <Grid key={iconTitle} item xs={Math.trunc(12 / iconsData.length)}>
          <Box className={classes.icon}>
            {icons.find((i) => i.id === svgId).path}
          </Box>
          <Typography variant="subtitle2" className={decorators.bold}>
            {iconTitle}
          </Typography>
          <Typography variant="subtitle2">
            Afluencia
          </Typography>
          <Typography variant="subtitle2">
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
  const link = getUsesLink()

  useEffect(() => {
    dispatch(usesActions.clickOnParcel(smp))
  }, [dispatch, smp])
  return (
    <ContainerBar
      type="list"
    >
      {data?.length > 0
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
      {
        data.length !== 0 && (
          <Typography variant="body1" className={`${decorators.bold} ${classes.info}`}>
            Para mayor descripción verificar el cuadro de usos haciendo click
            {' '}
            <Link
              className={classes.link}
              href={link}
              target="_blank"
              rel="noopener"
              underline="always"
            >
              aquí
            </Link>
          </Typography>
        )
      }
      { data.length === 0 && !isLoading && !smp && <SelectParcel />}
      { data.length === 0 && !isLoading && smp
        && (
        <Typography variant="body1">
          {getAlert('no_usos').text}
        </Typography>
        )}
      { isLoading && (
        <Typography variant="body1">
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
  iconsData: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default Uses
