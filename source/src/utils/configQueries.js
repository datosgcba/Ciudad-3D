import icons from 'utils/svgIcons'

let config = null
const loadAppConfig = async () => {
  if (config !== null) {
    return
  }
  const url = process.env.REACT_APP_URL_CONFIG
  config = await fetch(url).then((data) => data.json())
}
// Métodos que devuelven mucha data y puede no ser serializable
const getFullLayerConfig = (idGroup, idLayer) => config.layersGroup
  .find((g) => g.id === idGroup)
  .layers.find((l) => l.id === idLayer)

// Métodos que retornan data acotada y segura de serializar
const getCategories = () => config.categories.map(({
  id, title, path, url
}) => ({
  id,
  title,
  url,
  path: icons.find((i) => i.id === path).path
}))

const getLayersGroups = () => config.layersGroup.map(({ id, title }) => ({
  id,
  title
}))

const getLayersByLayersGroupId = (layersGroupId) => config.layersGroup
  .find((l) => l.id === layersGroupId)
  .layers.map(({
    id, title, color, index, info, link, reference
  }) => ({
    id,
    title,
    color,
    index,
    info,
    link,
    reference
  }))

const getWorksGroups = () => config.works.map(({
  id, title, info, link, columns
}) => ({
  id,
  title,
  info,
  link,
  columns
}))

const getInspectionsGroups = () => config.inspections.map(({
  id, title, info, link, columns
}) => ({
  id,
  title,
  info,
  link,
  columns
}))

const getInformation = () => config.information.map(({
  id, title, description, color
}) => ({
  id,
  title,
  description,
  color
}))

const getNormative = () => config.normative.map(({
  id, title, description, color, link
}) => ({
  id,
  title,
  description,
  color,
  link
}))

const getBasicData = () => config.basicData.map(({
  title, fill, format, isNumber
}) => ({
  title,
  fill,
  format,
  isNumber
}))

const getCapitalGain = () => config.capitalGain.map(({ title, fill, format }) => ({
  title,
  fill,
  format
}))

const getBuildable = () => config.buildable.map(
  ({
    title, items, isArea, isPlusvalia, large, info, link, valueLink
  }) => ({
    title,
    items,
    isArea,
    isPlusvalia,
    large,
    info,
    link,
    valueLink
  })
)

const getUsesTable = async () => config.uses.map(({
  id, title, desc, afluencia, icons: icon
}) => ({
  id,
  title,
  desc,
  afluencia,
  iconsData: icon.map(({ title: iconTitle, svgId }) => ({
    iconTitle,
    svgId
  }))
}))

const getAffectationsTable = async () => config.affectations.map(({
  id, title, subtitle, desc, titleReport, textReport
}) => ({
  id,
  title,
  subtitle,
  desc,
  titleReport,
  textReport
}))

const getExplorerFilters = () => config.explorerFilters.map(({ id, filterId, title }) => ({
  id,
  filterId,
  title
}))

const getFullExplorerLayerConfig = (idExplorer) => config
  .explorerFilters.find((g) => g.id === idExplorer).layers

const getExplorerOptions = (idExplorer) => config.explorer.filter((c) => c.id === idExplorer)

const getExplorer = () => config.explorer

const getAlert = (idAlert) => config.alerts.find(({ id }) => id === idAlert)

const getCategoryTitle = (idCategory) => config.categories.find(({ id }) => id === idCategory).title

const getSectionInfo = (selectedOp, idTitle) => config[selectedOp].find(({ id }) => id === idTitle)

const getParcel3D = () => config.parcelLayers.edif_3D

const getApiUrl = () => config.urlAPI

const getPhotoUrl = () => config.urlPhoto

const getWsUsigUrl = () => config.urlWsUsig

const getPdfUrl = () => config.urlPDF

const getParcelLayer = () => config.parcelLayers

const getBaseLayers = () => config.baseLayers

const getUsesLink = () => config.information.find((Uses) => Uses.id === 'Uses').link

const getCamera = () => config.camera

const getArticlesData = ((idArticle) => config.articles.find(({ id }) => id === idArticle))

export {
  loadAppConfig, getCategories, getFullLayerConfig, getInformation, getBasicData, getLayersGroups,
  getLayersByLayersGroupId, getBuildable, getExplorer, getUsesTable, getWorksGroups,
  getAffectationsTable, getExplorerOptions, getExplorerFilters, getCapitalGain,
  getInspectionsGroups, getAlert, getCategoryTitle, getSectionInfo, getFullExplorerLayerConfig,
  getParcel3D, getApiUrl, getPhotoUrl, getWsUsigUrl, getPdfUrl, getParcelLayer, getBaseLayers,
  getUsesLink, getCamera, getArticlesData, getNormative
}
