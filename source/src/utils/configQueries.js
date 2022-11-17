import icons from 'utils/svgIcons'

let config = null
const loadAppConfig = async () => {
  if (config !== null) {
    return
  }
<<<<<<< HEAD
  const url = process.env.REACT_APP_URL_CONFIG
  config = await fetch(url).then((data) => data.json())
=======
  const configEnviroment = window.configs
  const { urlConfigBase, urlLayers, includes, replaces } = configEnviroment
  let configBaseText = await fetch(urlConfigBase).then((data) => data.text())

  replaces.forEach(({ key, value }) => {
    configBaseText = configBaseText.replace(new RegExp(key, 'g'), value)
  })

  const configBase = JSON.parse(configBaseText)

  const configLayers = await fetch(urlLayers).then((data) => data.json())

  const layersGroup = groupLayersByCategory(
    configLayers.visibilidad.cur3d.mbtiles
  )

  config = {
    ...configBase,
    layersGroup,
    ...includes
  }
>>>>>>> develop
}

const getImagesToLoad = () => {
  const imagesToLoad = config.layersGroup
    .flatMap(({ layers }) => layers.flatMap(({ images }) => images))
    .flat()
    .filter((imageData) => imageData)

  return imagesToLoad
}

const getImagesToMerge = () => {
  const imagesToMerge = config.layersGroup
    .flatMap(({ layers }) =>
      layers.map(({ images }) =>
        images?.filter(
          (imagesItem) => Array.isArray(imagesItem) && imagesItem?.length > 1
        )
      )
    )
    .filter((images) => images?.length)
    .flat()

  return imagesToMerge
}

const groupLayersByCategory = (layers) => {
  return layers
    .reduce((layersGroup, { categoria, anio, frontend_config }) => {
      let auxCategory = layersGroup.find(
        (category) => category.id === categoria.id
      )
      if (!auxCategory) {
        auxCategory = {
          id: categoria.id,
          title: categoria.nombre,
          layers: []
        }
        layersGroup.push(auxCategory)
      }

      auxCategory.layers.push({
        ...frontend_config,
        anio
      })

      return layersGroup
    }, [])
    .filter(({ id, layers }) => id && layers?.length > 0 && layers[0].id)
}

// Métodos que devuelven mucha data y puede no ser serializable
const getFullLayerConfig = (idGroup, idLayer) =>
  config.layersGroup
    .find((g) => g.id === idGroup)
    .layers.find((l) => l.id === idLayer)

// Métodos que devuelven mucha data y puede no ser serializable, recomendable usar getFullLayerConfig
const getFullLayerConfigByIdLayer = (idLayer) =>
  config.layersGroup
    .flatMap(({ layers }) => layers)
    .find(({ id, options }) => Array.isArray(options)
      ? options.some(({ id }) => id === idLayer)
      : id === idLayer
    )

// Métodos que retornan data acotada y segura de serializar
const getCategories = () =>
  config.categories.map(({ id, title, path, url }) => ({
    id,
    title,
    url,
    path: icons.find((i) => i.id === path).path
  }))

const getLayersGroups = () =>
  config.layersGroup.map(({ id, title }) => ({
    id,
    title
  }))

const getLayersByLayersGroupId = (layersGroupId) =>
  config.layersGroup
    .find((l) => l.id === layersGroupId)
    .layers.map(({ id, title, color, icon, index, info, link, reference }) => ({
      id,
      idGroup: layersGroupId,
      title,
      color,
      icon,
      index,
      info,
      link,
      reference
    }))

const getVisibleLayers = ({ groups }) => {
  const groupsValues = Object.values(groups)
  const visibleGroups = groupsValues
    .map((g) => Object.keys(g).filter((k) => g[k].isVisible))
    .flat()

  const visibleLayers = getLayersGroups()
    .map(({ id }) => {
      return getLayersByLayersGroupId(id).filter(({ id }) =>
        visibleGroups.includes(id)
      )
    })
    .flat()
  return visibleLayers
}
const getWorksGroups = () =>
  config.works.map(({ id, title, info, link, columns }) => ({
    id,
    title,
    info,
    link,
    columns
  }))

const getInspectionsGroups = () =>
  config.inspections.map(({ id, title, info, link, columns }) => ({
    id,
    title,
    info,
    link,
    columns
  }))

const getInformation = () =>
  config.information.map(({ id, title, description, color }) => ({
    id,
    title,
    description,
    color
  }))

const getNormative = () =>
  config.normative.map(({ id, title, description, color, link }) => ({
    id,
    title,
    description,
    color,
    link
  }))

const getBasicData = () =>
  config.basicData.map(({ title, fill, format, isNumber }) => ({
    title,
    fill,
    format,
    isNumber
  }))

const getCapitalGain = () =>
  config.capitalGain.map(({ title, fill, format }) => ({
    title,
    fill,
    format
  }))

const getBuildable = () =>
  config.buildable.map(
    ({ title, items, isArea, isPlusvalia, large, info, link, valueLink }) => ({
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

const getUsesTable = async () =>
  config.uses.map(({ id, title, desc, afluencia, icons: icon }) => ({
    id,
    title,
    desc,
    afluencia,
    iconsData: icon.map(({ title: iconTitle, svgId }) => ({
      iconTitle,
      svgId
    }))
  }))

const getAffectationsTable = async () =>
  config.affectations.map(
    ({ id, title, subtitle, desc, titleReport, textReport }) => ({
      id,
      title,
      subtitle,
      desc,
      titleReport,
      textReport
    })
  )

const getExplorerFilters = () =>
  config.explorerFilters.map(({ id, filterId, title }) => ({
    id,
    filterId,
    title
  }))

const getFullExplorerLayerConfig = (idExplorer) =>
  config.explorerFilters.find((g) => g.id === idExplorer).layers

const getExplorerOptions = (idExplorer) =>
  config.explorer.filter((c) => c.id === idExplorer)

const getExplorer = () => config.explorer

const getAlert = (idAlert) => config.alerts.find(({ id }) => id === idAlert)

const getCategoryTitle = (idCategory) =>
  config.categories.find(({ id }) => id === idCategory).title

const getSectionInfo = (selectedOp, idTitle) =>
  config[selectedOp].find(({ id }) => id === idTitle)

const getParcel3D = () => config.parcelLayers.edif_3D

const getApiUrl = () => config.urlAPI

const getPhotoUrl = () => config.urlPhoto

const getWsUsigUrl = () => config.urlWsUsig

const getPdfUrl = () => config.urlPDF

const getCadUrl = () => config.urlCAD

const getParcelLayer = () => config.parcelLayers

const getBaseLayers = () => config.baseLayers

const getUsesLink = () =>
  config.information.find((Uses) => Uses.id === 'Uses').link

const getCamera = () => config.camera

const getArticlesData = (idArticle) =>
  config.articles.find(({ id }) => id === idArticle)

export {
  loadAppConfig,
  getCategories,
  getFullLayerConfig,
  getInformation,
  getBasicData,
  getLayersGroups,
  getFullLayerConfigByIdLayer,
  getLayersByLayersGroupId,
  getVisibleLayers,
  getBuildable,
  getExplorer,
  getUsesTable,
  getWorksGroups,
  getAffectationsTable,
  getExplorerOptions,
  getExplorerFilters,
  getCapitalGain,
  getInspectionsGroups,
  getAlert,
  getCategoryTitle,
  getSectionInfo,
  getFullExplorerLayerConfig,
  getParcel3D,
  getApiUrl,
  getPhotoUrl,
  getWsUsigUrl,
  getPdfUrl,
  getCadUrl,
  getParcelLayer,
  getBaseLayers,
  getUsesLink,
  getCamera,
  getArticlesData,
  getNormative,
  getImagesToLoad,
  getImagesToMerge
}
