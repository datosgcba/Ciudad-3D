import React from 'react'

import PropTypes from 'prop-types'

import { Box } from '@material-ui/core'
import DirectionsIcon from '@material-ui/icons/Directions'

import useStyles from './styles'

const FeatureInfo = ({ contenido, direccionNormalizada }) => {
  const classes = useStyles()
  const titulo = contenido.filter((p) => p.nombreId === 'nombre')[0].valor
  const comoLlegoURL = `https://mapa.buenosaires.gob.ar/comollego/?lat=-34.620866&lng=-58.462780&zl=15&modo=transporte&hasta=${direccionNormalizada}`

  return (

    <Box className={classes.featureInfo}>
      <h4>{titulo}</h4>
      <Box className={classes.markerProperties}>
        {
          contenido.map((p) => ((p.nombreId !== 'nombre' && p.nombreId[0] !== '_' && p.valor[0] !== '<' && p.valor !== '')
            ? (
              <Box className={classes.markerProperty} key={p.nombreId}>
                <Box component="span" className={classes.markerPropertiesKey}>
                  {p.nombre}
                  :
                  {' '}
                </Box>
                <Box component="span" className={classes.ultimaActualizacion}>{p.valor}</Box>

              </Box>
            )
            : null))
        }
      </Box>
      <Box className={classes.goContainer}>
        <a target="_blank" rel="noopener noreferrer" href={comoLlegoURL} style={{ color: '#FFCE38' }}>
          <DirectionsIcon />
        </a>
      </Box>
    </Box>

  )
}

FeatureInfo.propTypes = {
  contenido: PropTypes.arrayOf(PropTypes.object),
  direccionNormalizada: PropTypes.string
}

FeatureInfo.defaultProps = {
  contenido: [],
  direccionNormalizada: ''
}
export default FeatureInfo
