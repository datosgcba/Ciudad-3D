import {
  getApiUrl,
  getPhotoUrl,
  getWsUsigUrl,
  getPdfUrl
} from './configQueries'

const getParcel = ({ lng, lat }) =>
  `${getApiUrl()}/catastro/parcela/?lng=${lng}&lat=${lat}`

const getParcelBySmp = (smp) => `${getApiUrl()}/catastro/parcela/?smp=${smp}`

const getGeometrical = (smp) => `${getApiUrl()}/catastro/geometria/?smp=${smp}`

const getBuildable = (smp) =>
  `${getApiUrl()}/cur3d/seccion_edificabilidad/?smp=${smp}`

const getEnrase = (smp) =>
  `${getApiUrl()}/cur3d/parcelas_plausibles_a_enrase/?smp=${smp}`

const getCapitalGain = (smp) =>
  `${getApiUrl()}/cur3d/calcular_plusvalia/?smp=${smp}`

const getUses = (smp) => `${getApiUrl()}/cur3d/mixtura_usos/?smp=${smp}`

const getUsesCategories = () => `${getApiUrl()}/cur3d/categorias`

const getUsesRubros = (idCategory, idMixtura) => `${getApiUrl()}/cur3d/cuadrosdeuso/rubros/?categoria=${idCategory}&mixtura=${idMixtura}`

const getUsesReferences = (idCategory, idMixtura, rubro) => `${getApiUrl()}/cur3d/cuadrosdeuso/referencias/?categoria=${idCategory}&mixtura=${idMixtura}&rubro=${rubro}`

const getAffectations = (smp) => `${getApiUrl()}/cur3d/afectaciones/?smp=${smp}`

const getWorks = (smp) => `${getApiUrl()}/cur3d/obras/?smp=${smp}`

const getSade = (smp) => `${getApiUrl()}/cur3d/sade/?smp=${smp}`

const getInspections = (smp) => `${getApiUrl()}/cur3d/inspecciones/?smp=${smp}`

const getPlusvalia = (smp, area = 0) =>
  `${getApiUrl()}/cur3d/calcular_plusvalia/?smp=${smp}&area_edificar=${area}`

const getPhotoData = (smp) => `${getPhotoUrl()}/getDatosFotos?smp=${smp}`

const getPhoto = (smp, idx) =>
  `${getPhotoUrl()}/getFoto?smp=${smp}&i=${idx}&w=243`

const getDataWsUsig = (x, y) => `${getWsUsigUrl()}/datos_utiles?x=${x}&y=${y}`

const getPdfLink = (pdf) => `${getPdfUrl()}/${pdf}`

export {
  getParcel,
  getParcelBySmp,
  getGeometrical,
  getBuildable,
  getEnrase,
  getCapitalGain,
  getUses,
  getUsesCategories,
  getUsesReferences,
  getUsesRubros,
  getAffectations,
  getWorks,
  getSade,
  getInspections,
  getPlusvalia,
  getPhotoData,
  getPhoto,
  getDataWsUsig,
  getPdfLink
}
