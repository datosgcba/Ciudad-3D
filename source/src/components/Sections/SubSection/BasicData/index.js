import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, Grid, makeStyles, Link
} from '@material-ui/core'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'
import SelectParcel from 'components/Sections/SubSection/SelectParcel'
import Carrousel from 'components/Carrousel'

import { useSelector } from 'react-redux'

import { getBasicData } from 'utils/configQueries'

import useStyles from './styles'

const Details = ({
  classes, decorators, title, value, format
}) => (
  <Box className={classes.card}>
    <Grid container>
      <Grid item xs={7}>
        <Typography variant="subtitle2" className={decorators.bold}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="subtitle2" className={`${classes.value}`}>
          {format === 'url' && value[0] && (
            <Link
              href={value[0]}
              className={classes.link}
              target="_blank"
              rel="noopener"
            >
              {value[2]}
            </Link>
          )}
          {format === 'url' && !value[0] && 'Cargando. . .'}
          {format !== 'url' && value[0] !== undefined && `${value[0]} ${format}`}
          {format !== 'url' && value[0] === undefined && 'Cargando. . .'}
        </Typography>
      </Grid>
    </Grid>
  </Box>
)

const BasicData = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const data = useSelector((state) => state.basicData.data)
  const linkImagen = useSelector((state) => state.buildable.data?.link_imagen)
  const superficieParcela = useSelector((state) => state.buildable.data.superficie_parcela)
  const isSelected = useSelector((state) => state.basicData.isSelected)
  const { photoData } = data

  return (
    <ContainerBar type="list">
      {isSelected && (
        <Box>
          {!!photoData?.length && <Carrousel photos={photoData} />}
          {getBasicData().map(({
            title, fill, format, isNumber
          }, index) => {
            const fills = fill.split(',')
            const value = []

            const valueFill = fill === 'superficie_parcela'
              ? superficieParcela?.toString()
              : data[fills[0]]
            if (valueFill) {
              value.push(
                isNumber
                  ? Number.parseFloat(valueFill).toLocaleString('es-AR')
                  : valueFill
              )
            }
            if (format === 'url' && linkImagen) {
              value.push(linkImagen[fills[0]])
              value.push(...fills)
            }
            return (
              <Details
                // eslint-disable-next-line react/no-array-index-key
                key={`${index}_${title}`}
                classes={classes}
                decorators={decorators}
                title={title}
                value={value}
                format={format}
              />
            )
          })}
        </Box>
      )}
      {!isSelected && <SelectParcel />}
    </ContainerBar>
  )
}

Details.propTypes = {
  classes: PropTypes.objectOf(makeStyles).isRequired,
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  format: PropTypes.string.isRequired
}

Details.defaultProps = {
  value: ''
}

export default BasicData
