const getParcel = ({ lng, lat }) => `https://epok.buenosaires.gob.ar/catastro/parcela/?lng=${lng}&lat=${lat}`

const getParcelBySmp = (smp) => `https://epok.buenosaires.gob.ar/catastro/parcela/?smp=${smp}`

const getGeometrical = (smp) => `https://epok.buenosaires.gob.ar/catastro/geometria/?smp=${smp}`

const getBuildable = (smp) => `https://epok.buenosaires.gob.ar/catastro/seccion_edificabilidad/?smp=${smp}`

const getUses = (smp) => `https://epok.buenosaires.gob.ar/catastro/mixtura_usos/?smp=${smp}`

export {
  getParcel, getParcelBySmp, getGeometrical, getBuildable, getUses
}
