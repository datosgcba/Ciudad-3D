import config from 'appConfig'

const getFullLayerConfig = (indexGroup, idLayer) => config
  .grupos[indexGroup]
  .layers.find((l) => l.id === idLayer)

const getGroups = () => config.grupos.map(({ title, private: isPrivate }, index) => ({
  index,
  title,
  isPrivate
}))

const getLayersConfigByGroupIndex = (index) => config.grupos[index]
  .layers.map(({ id, private: isPrivate }) => ({
    id,
    isPrivate
  }))

export { getFullLayerConfig, getGroups, getLayersConfigByGroupIndex }
