import config from 'appConfig.json'
import icons from 'utils/svgIcons'

// Métodos que devuelven mucha data y puede no ser serializable
const getFullLayerConfig = (idGroup, idLayer) => config
  .layersGroup.find((g) => g.id === idGroup)
  .layers.find((l) => l.id === idLayer)

// Métodos que retornan data acotada y segura de serializar
const getCategories = () => config.categories.map(
  ({ id, title, path }) => ({ id, title, path: icons.find((i) => i.id === path).path })
)

const getLayersGroups = () => config.layersGroup.map(({ id, title }) => ({
  id,
  title
}))

const getLayersByLayersGroupId = (layersGroupId) => config
  .layersGroup.find((l) => l.id === layersGroupId)
  .layers.map(({ id, title, color }) => ({
    id,
    title,
    color
  }))

const getWorksGroups = () => config.works.map(({ id, title, columns }) => ({
  id,
  title,
  columns
}))

const getInspectionsGroups = () => config.inspections.map(({ id, title, columns }) => ({
  id,
  title,
  columns
}))

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
  title, items, isArea, isPlusvalia
}) => ({
  title, items, isArea, isPlusvalia
}))

const getUsesTable = async () => config.uses.map(({
  id, title, desc, afluencia, icons: icon
}) => ({
  id,
  title,
  desc,
  afluencia,
  iconsData: icon.map(({ title: iconTitle, svgId }) => (
    { iconTitle, svg: icons.find((i) => i.id === svgId).path }
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

const getFullExplorerLayerConfig = (idExplorer) => config
  .explorerFilters.find((g) => g.id === idExplorer).layers

const getExplorerOptions = (filter) => config.explorer.filter((c) => c.id === filter)

const getAlert = (idAlert) => config.alerts.find(({ id }) => id === idAlert).text

const getCategoryTitle = (idCategory) => config.categories.find(({ id }) => id === idCategory).title

const getSectionTitle = (idTitle) => config.information.find(({ id }) => id === idTitle).title

export {
  getCategories, getFullLayerConfig, getInformation, getBasicData,
  getLayersGroups, getLayersByLayersGroupId, getBuildable,
  getUsesTable, getWorksGroups, getAffectationsTable, getExplorerOptions,
  getExplorerFilters, getCapitalGain, getInspectionsGroups, getAlert,
  getCategoryTitle, getSectionTitle, getFullExplorerLayerConfig
}
