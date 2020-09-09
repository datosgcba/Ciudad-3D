const getParcelApi = ({ lng, lat }) => `https://epok.buenosaires.gob.ar/catastro/parcela/?lng=${lng}&lat=${lat}`

const getGeometricalApi = (smp) => `https://epok.buenosaires.gob.ar/catastro/geometria/?smp=${smp}`

const getBuildableApi = ({ lng, lat, smp }) => `https://epok.buenosaires.gob.ar/catastro/seccion_edificabilidad/?smp=${smp}&lng=${lng}&lat=${lat}`

const getBoundariesParcelsApi = ({ lng, lat }) => `https://epok.buenosaires.gob.ar/catastro/consultar_parcelas_linderas/?lng=${lng}&lat=${lat}`

const getCapitalGainApi = ({
  lng, lat, area_edificar, smp
}) => `https://epok.buenosaires.gob.ar/catastro/calcular_plusvalia/?lng=${lng}&lat=${lat}&smp=${smp}&ae=${area_edificar}`

export {
  getParcelApi, getGeometricalApi, getBuildableApi, getBoundariesParcelsApi, getCapitalGainApi
}
