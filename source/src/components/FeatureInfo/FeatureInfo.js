import React from 'react'

import PropTypes from 'prop-types'

import { Box } from '@material-ui/core'

import useStyles from './styles'

const FeatureInfo = ({ contenido }) => {
  const classes = useStyles()
  const titulo = contenido.filter((p) => p.nombreId === 'nombre')[0].valor

  return (
    <Box className={classes.featureInfo}>
      <h4>{titulo}</h4>
      <Box className={classes.markerProperties}>
        {contenido.map((p) =>
          p.nombreId !== 'nombre' &&
            p.nombreId[0] !== '_' &&
            p.valor[0] !== '<' &&
            p.valor !== '' ? (
            <Box className={classes.markerProperty} key={p.nombreId}>
              <Box component="span" className={classes.markerPropertiesKey}>
                {p.nombre}:{' '}
              </Box>
              <Box component="span" className={classes.ultimaActualizacion}>
                {p.valor}
              </Box>
            </Box>
          ) : null
        )}
      </Box>
    </Box>
  )
}

FeatureInfo.propTypes = {
  contenido: PropTypes.arrayOf(PropTypes.object)
}

FeatureInfo.defaultProps = {
  contenido: []
}
export default FeatureInfo
