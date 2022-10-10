import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import {
  Box,
  Typography,
  Grid,
  makeStyles,
  Link,
  TextField
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import useFontsStyles from 'theme/fontsDecorators'

import { useDispatch, useSelector } from 'react-redux'

import ContainerBar from 'components/Sections/ContainerBar'
import SelectParcel from 'components/Sections/SubSection/SelectParcel'

import icons from 'utils/svgIcons'

import { getAlert, getUsesLink } from 'utils/configQueries'

import { actions as usesActions } from 'state/ducks/uses'

import useStyles from './styles'

const Details = ({
  classes,
  title,
  fill,
  afluencia,
  iconsData,
  decorators
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
          <Typography variant="caption">{fill}</Typography>
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
          <Typography variant="subtitle2">Afluencia</Typography>
          <Typography variant="subtitle2">{afluencia}</Typography>
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

  const categories =
    data?.length > 0 &&
    data[0].usesCategories.map(({ id, nombre: title }) => ({ id: id, title }))

  const rubros =
    data?.length > 0 &&
    data[0].rubros?.length > 0 &&
    data[0].rubros.map(({ id, rubro: title }) => ({ id: id, title }))

  const references =
    data?.length > 0 && data[0].references ? data[0].references : null

  useEffect(() => {
    dispatch(usesActions.clickOnParcel(smp))
  }, [dispatch, smp])

  const handleCategoriaChange = (e, value) => {
    dispatch(usesActions.categorySelected(value.id))
  }

  const handleRubroChange = (e, value) => {
    dispatch(usesActions.rubroSelected(value.title))
  }

  return (
    <ContainerBar type="list">
      {data?.length > 0 &&
        data.map(({ id, title, desc, afluencia, iconsData }) => (
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
      {categories?.length > 0 && (
        <Autocomplete
          className={classes.combo}
          limitTags={3}
          options={categories}
          // value={value}
          // onOpen={() => setFocusFilter(true)}
          // onClose={() => setFocusFilter(false)}
          getOptionLabel={(option) => option.title}
          onChange={handleCategoriaChange}
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField
              {...params}
              variant="outlined"
              label="Categorias"
              placeholder="Categoria"
            />
          )}
        />
      )}
      {rubros?.length > 0 && (
        <Autocomplete
          className={classes.combo}
          limitTags={3}
          options={rubros}
          // value={value}
          // onOpen={() => setFocusFilter(true)}
          // onClose={() => setFocusFilter(false)}
          getOptionLabel={(option) => option.title}
          onChange={handleRubroChange}
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField
              {...params}
              variant="outlined"
              label="Rubros"
              placeholder="rubro"
            />
          )}
        />
      )}
      {references !== null && (
        <Box className={classes.card}>
          <Grid className={classes.container}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" className={decorators.bold}>
                Bicicletas:
              </Typography>
            </Grid>
            {references?.bicicletas?.length > 0 &&
              references.bicicletas.map(({ detalle }) => (
                <Grid item xs={12}>
                  <Typography variant="caption">{detalle}</Typography>
                </Grid>
              ))}
          </Grid>
          <Grid className={classes.container}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" className={decorators.bold}>
                Estacionamientos:
              </Typography>
            </Grid>
            {references?.estacionamientos?.length > 0 &&
              references.estacionamientos.map(({ detalle }) => (
                <Grid item xs={12}>
                  <Typography variant="caption">{detalle}</Typography>
                </Grid>
              ))}
          </Grid>
          <Grid className={classes.container}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" className={decorators.bold}>
                Carga y Descarga:
              </Typography>
            </Grid>
            {references?.cargaydescarga?.length > 0 &&
              references.cargaydescarga.map(({ detalle }) => (
                <Grid item xs={12}>
                  <Typography variant="caption">{detalle}</Typography>
                </Grid>
              ))}
          </Grid>
          <Grid className={classes.container}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" className={decorators.bold}>
                Observaciones:
              </Typography>
            </Grid>
            {references?.observaciones?.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="caption">
                  {references.observaciones}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
      {data.length === 0 && !isLoading && !smp && <SelectParcel />}
      {data.length === 0 && !isLoading && smp && (
        <Typography variant="body1">{getAlert('no_usos').text}</Typography>
      )}
      {isLoading && <Typography variant="body1">Cargando...</Typography>}
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
