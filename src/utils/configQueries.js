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

export {
  getFullLayerConfig, getGroups, getLayersConfigByGroupId,
  getCustomsIcons, getInformation, getBasicData,
  getLayersGroups, getLayersByLayersGroupId, getBuildable
}
