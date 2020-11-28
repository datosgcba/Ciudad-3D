import { getApiUrl } from './configQueries'

const getParcel = ({ lng, lat }) => `${getApiUrl()}/catastro/parcela/?lng=${lng}&lat=${lat}`

const getParcelBySmp = (smp) => `${getApiUrl()}/catastro/parcela/?smp=${smp}`

const getGeometrical = (smp) => `${getApiUrl()}/catastro/geometria/?smp=${smp}`

const getBuildable = (smp) => `${getApiUrl()}/cur3d/seccion_edificabilidad/?smp=${smp}`

const getCapitalGain = (smp) => `${getApiUrl()}/cur3d/calcular_plusvalia/?smp=${smp}`

const getUses = (smp) => `${getApiUrl()}/cur3d/mixtura_usos/?smp=${smp}`

const getAffectations = (smp) => `${getApiUrl()}/cur3d/afectaciones/?smp=${smp}`

const getWorks = (smp) => `${getApiUrl()}/cur3d/obras/?smp=${smp}`

const getInspections = (smp) => `${getApiUrl()}/cur3d/inspecciones/?smp=${smp}`
const getPlusvalia = (smp, area) => `${getApiUrl()}/cur3d/calcular_plusvalia/?smp=${smp}&area_edificar=${area}`

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
