import config from 'appConfig.json'
// Métodos que devuelven mucha data y puede no ser serializable
const getFullLayerConfig = (idGroup, idLayer) => config
  .grupos.find((g) => g.id === idGroup)
  .layers.find((l) => l.id === idLayer)

// Métodos que retornan data acotada y segura de serializar
const getCategories = () => config.categories.map(
  // TODO: agregar path al appConfig,json
  ({ id, title }) => ({ id, title })
)

const getLayersGroups = () => config.layersGroup.map(({ id, title }) => ({
  id,
  title
}))

const getLayersByLayersGroupId = (layersGroupId) => config
  .layersGroup.find((l) => l.id === layersGroupId)
  .layers.map(({ title, color }) => ({
    title,
    color
  }))

const getWorksGroups = () => config.works.map(({ id, title }) => ({
  id,
  title
}))

const getColumnsWorksByWorksId = (workId) => config
  .works.find((w) => w.id === workId).columns

const getInspectionsGroups = () => config.inspections.map(({ id, title }) => ({
  id,
  title
}))

const getColumnsInspectionsByInspectionsId = (inspectionId) => config
  .inspections.find((i) => i.id === inspectionId).columns

const getCustomsIcons = () => config.customIcons.map(({ id, data }) => ({ id, data }))

const getInformation = () => config.information.map(({ id, title, description }) => ({
  id, title, description
}))

const getBasicData = () => config.basicData.map(({ title, fill, format }) => ({
  title, fill, format
}))

const getCapitalGain = () => config.capitalGain.map(({ title, fill, format }) => ({
  title, fill, format
}))

const getBuildable = () => config.buildable.map(({
  title, fill, field, fillPL, fillSL, subtitle, subtitlePL, subtitleSL, format
}) => ({
  title, fill, field, fillPL, fillSL, subtitle, subtitlePL, subtitleSL, format
}))

// TODO: agregar iconos al appConfig,json
const getUsesTable = async () => config.uses.map(({
  id, title, desc, afluencia, icons
}) => ({
  id,
  title,
  desc,
  afluencia,
  iconsData: icons.map(({ title: iconTitle, svgId }) => (
    { iconTitle, svg: config.Icons[svgId] }
  ))
}))

const getAffectationsTable = async () => config.affectations.map(({
  id, title, subtitle, desc
}) => ({
  id,
  title,
  subtitle,
  desc
}))

const getExplorerFilters = () => config.explorerFilters.map(({
  id, filterId, title
}) => ({
  id, filterId, title
}))

const getExplorerOptions = (filter) => config.explorer.filter((c) => c.id === filter)

export {
  getCategories, getFullLayerConfig, getCustomsIcons, getInformation, getBasicData,
  getLayersGroups, getLayersByLayersGroupId, getBuildable,
  getUsesTable, getWorksGroups, getColumnsWorksByWorksId,
  getAffectationsTable, getExplorerOptions, getExplorerFilters, getCapitalGain,
  getInspectionsGroups, getColumnsInspectionsByInspectionsId
}
