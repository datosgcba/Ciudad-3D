const getParcelApi = ({ lng, lat }) => `https://epok.buenosaires.gob.ar/catastro/parcela/?lng=${lng}&lat=${lat}`

const getGeometricalApi = (smp) => `https://epok.buenosaires.gob.ar/catastro/geometria/?smp=${smp}`

const getBuildableApi = (smp) => `https://epok.buenosaires.gob.ar/catastro/seccion_edificabilidad/?smp=${smp}`

const getBoundariesParcels = ({ lng, lat }) => `https://epok.buenosaires.gob.ar/catastro/consultar_parcelas_linderas/?lng=${lng}&lat=${lat}`

export {
  getParcelApi, getGeometricalApi, getBuildableApi, getBoundariesParcels
}
