import config from 'appConfig'

const getFullLayerConfig = (idGroup, idLayer) => config
  .grupos.find((g) => g.id === idGroup)
  .layers.find((l) => l.id === idLayer)

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

export { getFullLayerConfig, getGroups, getLayersConfigByGroupId }
