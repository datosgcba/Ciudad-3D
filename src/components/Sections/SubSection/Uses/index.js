/* eslint-disable */
import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, Grid, IconButton, makeStyles
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'

import { actions as usesActions } from 'state/ducks/uses'
import { actions as categoriesActions } from 'state/ducks/categories'

import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'

const Details = ({ classes, title, fill, decorators }) => (

  <Box>
    <Box className={classes.card}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle3" className={decorators.bold}>
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
  </Box>
)

const Uses = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const data = useSelector((state) => state.uses.data)
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.basicData.data.smp)
  useEffect(() => {
    dispatch(usesActions.clickOnParcel(smp))
  }, [dispatch, smp])
  return (
    <ContainerBar>
      <Typography variant="h5" className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_xl}`}>
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
          Usos
        </Typography>
      </Box>
      {data &&
          data.map(({ id, title, desc }) => (
            <Details
              key={id}
              classes={classes}
              decorators={decorators}
              title={title}
              fill={desc}
            />
          ))
        }
        <Grid container style={{textAlign: 'center'}}>
        <Grid item xs={4}>
          <Typography variant="subtitle3" className={classes.gridTituloCategoria}>
          Residencia
          </Typography><br></br>
          <Typography variant="subtitle3">
          Afluencia<br></br>
          Mediana
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle3" className={classes.gridTituloCategoria}>
          Comercio
          </Typography><br></br>
          <Typography variant="subtitle3">
          Afluencia<br></br>
          Mediana
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle3"  className={classes.gridTituloCategoria}>
          Servicio
          </Typography><br></br>
          <Typography variant="subtitle3">
          Afluencia<br></br>
          Mediana
          </Typography>
        </Grid>
      </Grid> 
    </ContainerBar>
  )
}

Details.propTypes = {
  classes: PropTypes.objectOf(makeStyles).isRequired
}

export default Uses
