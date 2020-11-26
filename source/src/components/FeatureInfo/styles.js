import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  featureInfo: {
    padding: '0 5px 1px 5px',
    overflowY: 'auto',
    overflowX: 'hidden',
    fontSize: '13px',
    lineHeight: 1.5
  },
  markerPropertiesKey: {
    fontWeight: 'bold'
  },
  markerProperty: {
    marginTop: '1px'
  },
  ultimaActualizacion: {
    fontWeight: 'bold'
  },
  goContainer: {
    paddingTop: theme.spacing(2)
  }
}))
