import getApiUrl from './configQueries'

const apiUrl = getApiUrl()
const getParcel = ({ lng, lat }) => `${apiUrl}/catastro/parcela/?lng=${lng}&lat=${lat}`

const getParcelBySmp = (smp) => `${apiUrl}/catastro/parcela/?smp=${smp}`

const getGeometrical = (smp) => `${apiUrl}/catastro/geometria/?smp=${smp}`

const getBuildable = (smp) => `${apiUrl}/cur3d/seccion_edificabilidad/?smp=${smp}`

const getCapitalGain = (smp) => `${apiUrl}/cur3d/calcular_plusvalia/?smp=${smp}`

const getUses = (smp) => `${apiUrl}/cur3d/mixtura_usos/?smp=${smp}`

const getAffectations = (smp) => `${apiUrl}/cur3d/afectaciones/?smp=${smp}`

const getWorks = (smp) => `${apiUrl}/cur3d/obras/?smp=${smp}`

const getInspections = (smp) => `${apiUrl}/cur3d/inspecciones/?smp=${smp}`
const getPlusvalia = (smp, area) => `${apiUrl}/cur3d/calcular_plusvalia/?smp=${smp}&area_edificar=${area}`

export {
  getParcel,
  getParcelBySmp,
  getGeometrical,
  getBuildable,
  getCapitalGain,
  getUses,
  getAffectations,
  getWorks,
  getInspections,
  getPlusvalia
}
