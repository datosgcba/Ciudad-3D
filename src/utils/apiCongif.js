const getParcelApi = ({ lng, lat }) => `https://epok.buenosaires.gob.ar/catastro/parcela/?lng=${lng}&lat=${lat}`

const getGeometricalApi = (smp) => `https://epok.buenosaires.gob.ar/catastro/geometria/?smp=${smp}`

export { getParcelApi, getGeometricalApi }
