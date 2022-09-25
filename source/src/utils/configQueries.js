import icons from 'utils/svgIcons'

let config = null
const loadAppConfig = async () => {
  if (config !== null) {
    return
  }
  const configEnviroment = window.configs
  const { urlConfigBase, urlLayers, includes, replaces } = configEnviroment
  let configBaseText = await fetch(urlConfigBase).then((data) => data.text())

  replaces.forEach(({ key, value }) => {
    configBaseText = configBaseText.replace(new RegExp(key, 'g'), value)
  })

  const configBase = JSON.parse(configBaseText)

  const configLayers = await fetch(urlLayers).then((data) => data.json())

  configLayers.visibilidad.cur3d.mbtiles.push({
    id: 111,
    categoria: {
      id: 99,
      nombre: 'AMBIENTE',
      visibilidad: ['cur3d']
    },
    nombre: 'Establecimientos educativos',
    url: null,
    anio: 2022,
    tipo: '',
    origen_datos: null,
    autogenerado: null,
    fuente: null,
    frontend_config: {
      id: 'establecimientos_educativos_de_gestion_privada',
      images: [
        [
          {
            id: 'hexagono_verde',
            data:
              'https://epok.buenosaires.gob.ar//media/repok/uploads/mapainteractivoba/3.png'
          },
          {
            id: 'establecimientos_educativos_de_gestion_privada',
            data:
              'http://static.usig.buenosaires.gob.ar/symbols/b/establecimiento_educativo_de_gestion_privada.png'
          }
        ]
      ],
      info: null,
      link: null,
      type: 'custom',
      color: '#2ebc98',
      title: 'Establecimientos educativos',
      options: [
        {
          id:
            'establecimientos_educativos_de_gestion_privada_clustered_big_circle',
          type: 'circle',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              'rgba(110,204,57,.6)',
              10,
              'rgba(241,211,87,.6)',
              100,
              'rgba(253,156,115,.6)'
            ],
            'circle-radius': 20
          },
          source: {
            id: 'source_establecimientos_educativos_de_gestion_privada',
            type: 'geojson',
            data:
              'https://epok.buenosaires.gob.ar/getGeoLayer/?categoria=establecimientos_educativos_de_gestion_privada&formato=geojson&srid=4326',
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50
          }
        },
        {
          id:
            'establecimientos_educativos_de_gestion_privada_clustered_small_circle',
          type: 'circle',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              'rgba(110,204,57,.6)',
              10,
              'rgba(241,211,87,.6)',
              100,
              'rgba(253,156,115,.6)'
            ],
            'circle-radius': 15
          },
          source: {
            id: 'source_establecimientos_educativos_de_gestion_privada',
            type: 'geojson',
            data:
              'https://epok.buenosaires.gob.ar/getGeoLayer/?categoria=establecimientos_educativos_de_gestion_privada&formato=geojson&srid=4326',
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50
          }
        },
        {
          id: 'establecimientos_educativos_de_gestion_privada',
          type: 'symbol',
          layout: {
            'icon-allow-overlap': true,
            'icon-image': [
              'case',
              ['has', 'point_count'],
              '',
              'hexagono_verde_establecimientos_educativos_de_gestion_privada'
            ],
            'icon-size': 1,
            'text-field': [
              'case',
              ['has', 'point_count'],
              ['get', 'point_count_abbreviated'],
              ''
            ],
            'text-font': ['Klokantech Noto Sans Bold'],
            'text-size': 12
          },
          paint: {
            'text-color': '#333333'
          },
          source: {
            id: 'source_establecimientos_educativos_de_gestion_privada',
            type: 'geojson',
            data:
              'https://epok.buenosaires.gob.ar/getGeoLayer/?categoria=establecimientos_educativos_de_gestion_privada&formato=geojson&srid=4326',
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50
          }
        }
      ],
      displayPopup: false,
      popupContent: ''
    },
    timestamp_modificacion: '2022-09-19T12:58:41.146876'
  })

  configLayers.visibilidad.cur3d.mbtiles.push({
    id: 112,
    categoria: {
      id: 99,
      nombre: 'AMBIENTE',
      visibilidad: ['cur3d']
    },
    nombre: 'Establecimientos de salud',
    url: null,
    anio: 2022,
    tipo: '',
    origen_datos: null,
    autogenerado: null,
    fuente: null,
    frontend_config: {
      id: 'centros_de_salud',
      images: [
        [
          {
            id: 'cua_rojo',
            data:
              'https://epok.buenosaires.gob.ar/media/mapa_publico//images/icons_backgrounds/cua_rojo.png'
          },
          {
            id: 'hospital_general_de_agudos',
            data:
              'https://static.usig.buenosaires.gob.ar/symbols//b/hospital_general_de_agudos.png'
          }
        ],
        [
          {
            id: 'cua_violeta',
            data:
              'https://epok.buenosaires.gob.ar/media/mapa_publico//images/icons_backgrounds/cua_violeta.png'
          },
          {
            id: 'hospital_especializado',
            data:
              'https://static.usig.buenosaires.gob.ar/symbols//b/hospital_especializado.png'
          }
        ],
        [
          {
            id: 'cua_naranja',
            data:
              'https://epok.buenosaires.gob.ar/media/mapa_publico//images/icons_backgrounds/cua_naranja.png'
          },
          {
            id: 'hospital_de_ninos',
            data:
              'https://static.usig.buenosaires.gob.ar/symbols//b/hospital_de_ninos.png'
          }
        ],
        [
          {
            id: 'cua_azul',
            data:
              'https://epok.buenosaires.gob.ar/media/mapa_publico//images/icons_backgrounds/cua_azul.png'
          },
          {
            id: 'centros_de_salud_y_accion_comunitaria',
            data:
              'https://static.usig.buenosaires.gob.ar/symbols//b/centro_de_salud_y_accion_comunitaria.png'
          }
        ],
        [
          {
            id: 'cir_amarillo',
            data:
              'https://epok.buenosaires.gob.ar/media/mapa_publico//images/icons_backgrounds/cir_amarillo.png'
          },
          {
            id: 'centro_medico_barrial',
            data:
              'https://static.usig.buenosaires.gob.ar/symbols//n/centro_medico_barrial.png'
          }
        ],
        [
          {
            id: 'cua_verde',
            data:
              'https://epok.buenosaires.gob.ar/media/mapa_publico//images/icons_backgrounds/cua_verde.png'
          },
          {
            id: 'centro_de_salud_no_dependiente_del_gcba',
            data:
              'https://static.usig.buenosaires.gob.ar/symbols//b/centro_de_salud_no_dependiente_del_gcba.png'
          }
        ],
        [
          {
            id: 'cir_verde',
            data:
              'https://epok.buenosaires.gob.ar/media/mapa_publico//images/icons_backgrounds/cir_verde.png'
          },
          {
            id: 'estacion_saludable',
            data:
              'https://static.usig.buenosaires.gob.ar/symbols//n/estacion_saludable.png'
          }
        ]
      ],
      info: null,
      link: null,
      type: 'custom',
      color: '#2e4498',
      title: 'Establecimientos de salud',
      options: [
        {
          type: 'symbol',
          layout: {
            'icon-size': 0.75,
            'icon-allow-overlap': true,
            'icon-image': 'cua_azul_centros_de_salud_y_accion_comunitaria'
          },
          source: {
            id: 'source_centros_de_salud_y_accion_comunitaria',
            type: 'geojson',
            data:
              'https://epok.buenosaires.gob.ar/getGeoLayer/?categoria=centros_de_salud_y_accion_comunitaria&formato=geojson&srid=4326'
          }
        },
        {
          id: 'hospitales_de_ninos',
          type: 'symbol',
          layout: {
            'icon-size': 0.75,
            'icon-allow-overlap': true,
            'icon-image': 'cua_naranja_hospital_de_ninos'
          },
          source: {
            id: 'source_hospitales_de_ninos',
            type: 'geojson',
            data:
              'https://epok.buenosaires.gob.ar/getGeoLayer/?categoria=hospitales_de_ninos&formato=geojson&srid=4326'
          }
        },
        {
          id: 'hospitales_especializados',
          type: 'symbol',
          layout: {
            'icon-size': 0.75,
            'icon-allow-overlap': true,
            'icon-image': 'cua_violeta_hospital_especializado'
          },
          source: {
            id: 'source_hospitales_especializados',
            type: 'geojson',
            data:
              'https://epok.buenosaires.gob.ar/getGeoLayer/?categoria=hospitales_especializados&formato=geojson&srid=4326'
          }
        },
        {
          id: 'centros_medicos_barriales',
          type: 'symbol',
          layout: {
            'icon-size': 0.75,
            'icon-allow-overlap': true,
            'icon-image': 'cir_amarillo_centro_medico_barrial'
          },
          source: {
            id: 'source_centros_medicos_barriales',
            type: 'geojson',
            data:
              'https://epok.buenosaires.gob.ar/getGeoLayer/?categoria=centros_medicos_barriales&formato=geojson&srid=4326'
          }
        },
        {
          id: 'hospitales_generales_de_agudos',
          type: 'symbol',
          layout: {
            'icon-size': 0.75,
            'icon-allow-overlap': true,
            'icon-image': 'cua_rojo_hospital_general_de_agudos'
          },
          source: {
            id: 'source_hospitales_generales_de_agudos',
            type: 'geojson',
            data:
              'https://epok.buenosaires.gob.ar/getGeoLayer/?categoria=hospitales_generales_de_agudos&formato=geojson&srid=4326'
          }
        },
        {
          id: 'centros_de_salud_no_dependientes_del_gcba',
          type: 'symbol',
          layout: {
            'icon-size': 0.75,
            'icon-allow-overlap': true,
            'icon-image': 'cua_verde_centro_de_salud_no_dependiente_del_gcba'
          },
          source: {
            id: 'source_centros_de_salud_no_dependientes_del_gcba',
            type: 'geojson',
            data:
              'https://epok.buenosaires.gob.ar/getGeoLayer/?categoria=centros_de_salud_no_dependientes_del_gcba&formato=geojson&srid=4326'
          }
        },
        {
          id: 'estaciones_saludables',
          type: 'symbol',
          layout: {
            'icon-size': 0.75,
            'icon-allow-overlap': true,
            'icon-image': 'cir_verde_estacion_saludable'
          },
          source: {
            id: 'source_estaciones_saludables',
            type: 'geojson',
            data:
              'https://epok.buenosaires.gob.ar/getGeoLayer/?categoria=estaciones_saludables&formato=geojson&srid=4326'
          }
        }
      ],
      displayPopup: false,
      popupContent: ''
    },
    timestamp_modificacion: '2022-09-19T12:58:41.146876'
  })
  const layersGroup = groupLayersByCategory(
    configLayers.visibilidad.cur3d.mbtiles
  )

  config = {
    ...configBase,
    layersGroup,
    ...includes
  }
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
    .layers.map(({ id, title, color, index, info, link, reference }) => ({
      id,
      idGroup: layersGroupId,
      title,
      color,
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
  getParcelLayer,
  getBaseLayers,
  getUsesLink,
  getCamera,
  getArticlesData,
  getNormative,
  getImagesToLoad,
  getImagesToMerge
}
