import config from 'appConfig'
// Métodos que devuelven mucha data y puede no ser serializable
const getFullLayerConfig = (idGroup, idLayer) => config
  .grupos.find((g) => g.id === idGroup)
  .layers.find((l) => l.id === idLayer)

// Métodos que retornan data acotada y segura de serializar
const getGroups = () => config.grupos.map(({ id, title, private: isPrivate }) => ({
  id,
  title,
  isPrivate
}))

const getLayersConfigByGroupId = (idGroup) => config
  .grupos.find((g) => g.id === idGroup)
  .layers.map(({ id, private: isPrivate }) => ({
    id,
    isPrivate
  }))

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

const getWorksGroups = () => config.Works.map(({ id, title }) => ({
  id,
  title
}))

const getColumnsWorksByWorksId = (WorkId) => config
  .Works.find((w) => w.id === WorkId).columns

const getCustomsIcons = () => config.customIcons.map(({ id, data }) => ({ id, data }))

const getInformation = () => config.Information.map(({ id, title, description }) => ({
  id, title, description
}))

const getBasicData = () => config.BasicData.map(({ title, fill, format }) => ({
  title, fill, format
}))

const getBuildable = () => config.Buildable.map(({ title, fill, format }) => ({
  title, fill, format
}))

const getUsesTable = async () => config.Uses.map(({
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

export {
  getFullLayerConfig, getGroups, getLayersConfigByGroupId,
  getCustomsIcons, getInformation, getBasicData,
  getLayersGroups, getLayersByLayersGroupId, getBuildable, getUsesTable,
  getWorksGroups, getColumnsWorksByWorksId
}
