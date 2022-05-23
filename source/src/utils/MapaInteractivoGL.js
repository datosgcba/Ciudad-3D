// TODO: Corregir errores lint ¿tal vez migrar a componente funcional?
/* eslint-disable */

import * as mapboxgl from 'mapbox-gl'
import getLayer from './layer-builders/GenericLineLayerBuilder'
import genericLine from './layer-builders/GenericLineLayerBuilder'
import genericPoint from './layer-builders/GenericPointLayerBuilder'

const defaults = {
  markerZoomInLevel: 14,
  featureZoomInLevel: 17,
  params: {
    container: 'map',
    minzoom: 10,
    maxzoom: 18
  },
  // activeMarker: mapboxgl.Marker({color:'orange'}),
  // fromMarker: mapboxgl.Marker({color:'green'}),
  // toMarker: mapboxgl.Marker({color:'red'}),
  // marker: mapboxgl.Marker({color:'yellow'}),
  popup: new mapboxgl.Popup(),
  layers: {
    apiUrl: 'https://epok.buenosaires.gob.ar/',
    reverseGeocodeUrl: 'reverseGeocoderLugares'
  },
  texts: {
    es: {
      loadingLayers: 'Cargando capas...',
      loadingMaps: 'Cargando mapas...',
      loadingInformation: 'Cargando información...',
      errorLoadingInformation: 'Se produjo un error al acceder a la información. Reintente más tarde.'
    },
    en: {
      loadingLayers: 'Loading layers...',
      loadingMaps: 'Loading maps...',
      loadingInformation: 'Loading information...',
      errorLoadingInformation: 'An error ocurred. Please try again later.'
    }
  },
  language: 'es'
}

class MapaInteractivoGL {
  constructor(options) {
    this.config = { ...defaults, ...options, params: { ...defaults.params, ...options.params } }
    this.config.supportedLanguages = Object.keys(this.config.texts)
    if (this.config.supportedLanguages.length === 0) {
      this.config.texts = defaults.texts
      this.config.language = defaults.language
      this.config.supportedLanguages = Object.keys(this.config.texts)
    }
    if (this.config.supportedLanguages.indexOf(this.config.language) === -1) {
      this.config.language = this.config.supportedLanguages[0]
    }
    const params = { ...this.config.params, ...options }

    this.map = new mapboxgl.Map(params)
    //		this.map.addControl(new mapboxgl.NavigationControl())
    this._markers = {}
    this.popup = this.config.popup
    this._layers = {}
    // this.map.on('contextmenu', this._onContextMenu);
    this.map.on('click', this._onClick.bind(this))
    this.map.on('movestart', this._onMoveStart.bind(this))
    this.map.on('zoomend', this._onZoomEnd.bind(this))
    this.map.on('dragend', this._onDragEnd.bind(this))
    this.map.on('dataloading', function () {
      // console.log('dataloading:', Date.now());
    })
    this.map.on('data', function () {
      // console.log('data:', Date.now());
    })
    this.mapsDefs = null
    this.layersDefs = null
    this._layerBuilders = {
      /* tms: (config) => {
                    return L.tileLayer(config.url, config.options);
                }, */
      genericPoint,
      genericLine
      // cortes_de_transito,
      // estaciones_de_servicio,
      // estaciones_de_bicicletas,
      // recorrido
    }
  }

  isVisibleBaseLayerPrincipal() {
    return this.map.getLayoutProperty('baseLayer_principal', 'visibility') === 'visible'
  }

  toggleBaseLayer() {
    if (this.isVisibleBaseLayerPrincipal()) {
      this.map.setLayoutProperty('baseLayer_principal', 'visibility', 'none')
      this.map.setLayoutProperty('baseLayer_secundario', 'visibility', 'visible')
    } else {
      this.map.setLayoutProperty('baseLayer_principal', 'visibility', 'visible')
      this.map.setLayoutProperty('baseLayer_secundario', 'visibility', 'none')
    }
  }

  _getLayer(id) {
    this.map.getLayer(id)
    conosle('getLayer: ', getLayer)
  }

  setIdioma(idioma) {
    if (this.config.supportedLanguages.indexOf(idioma) > -1) {
      this.config.language = idioma
    }
  }

  _onClick(ev) {
    if (typeof (this.config.onClick) === 'function') {
      this.inactivateMarker()
      this.config.onClick(ev)
    }
    this.config.onClicked(ev.lngLat)
  }

  _onContextMenu(ev) {
    if (typeof (this.config.onContextMenu) === 'function') {
      this.config.onContextMenu(ev)
    }
  }

  _onMoveStart(ev) {
    if (typeof (this.config.onMoveStart) === 'function') {
      this.config.onMoveStart(ev)
    }
  }

  _onMoveEnd(ev) {
    if (typeof (this.config.onMoveEnd) === 'function') {
      this.config.onMoveEnd(ev)
    }
  }

  _onZoomEnd(ev) {
    if (typeof (this.config.onZoomEnd) === 'function') {
      this.config.onZoomEnd(ev)
    }
  }

  _onDragEnd(ev) {
    if (typeof (this.config.onDragEnd) === 'function') {
      this.config.onDragEnd(ev)
    }
  }

  _loadLayerDefs() {
    if (!this._loadingLayers && !this.layersDefs) {
      this._loadingLayers = true
      const layerPromise = fetch(`${this.config.layers.apiUrl}mapainteractivoba/layers/?protocol=https`)
        .then((res) => res.json())
        .then((layersDefs) => {
          this._loadingLayers = false
          this.layersDefs = layersDefs
        }).catch((err) => {
          console.error(err)
        })
      return layerPromise
    }
    return new Promise((resolve, reject) => reject())
  }

  setLayerDefs(defs) {
    this.layersDefs = defs
  }

  _addLayer(layerName, layerId, layerGroup, clustering) {
    const sourceId = layerId // uso el mismo id de la capa
    const self = this
    const layer = layerName.indexOf('.') === -1 ? this.layersDefs[layerName] : { [layerName]: this.layersDefs[layerName.split('.')[0]][layerName.split('.')[1]] }
    this.hideMessage()
    const builder = (this._layerBuilders[layerId] || !layer[layerId].builder) ? layerId : layer[layerId].builder
    try {
      if (this._layerBuilders[builder]) {
        if (!this._layers[layerName]) {
          this._layers[layerName] = []
        }
        if (this._layers[layerName][layerId]) {
          // borrarlo si ya esta ... ?
          // layerGroup.removeLayer(this._layers[layerName][layerId]);
        }
        this._layers[layerName][layerId] = this._layerBuilders[builder](sourceId, undefined,
          layer[layerId].style, layer[layerId].icon)

        self.map.addLayer(this._layers[layerName][layerId])
        self.map.on('click', sourceId, this._onFeatureClick.bind(this))

        // Change the cursor to a pointer when the mouse is over the places layer.
        self.map.on('mouseenter', sourceId, () => {
          self.map.getCanvas().style.cursor = 'pointer'
        })

        // Change it back to a pointer when it leaves.
        self.map.on('mouseleave', sourceId, () => {
          self.map.getCanvas().style.cursor = ''
        })
        /*
                  this._layers[layerName][layerId].on('click', this._onFeatureClick.bind(this));
                  this._layers[layerName][layerId].options.layerId = layerId;
                  this._layers[layerName][layerId].options.layerName = layerName;
                  layerGroup.addLayer(this._layers[layerName][layerId]);
                  this._layers[layerName][layerId].fire('add');
                  layerGroup.addTo(this.map);
                  if (layer[layerId].options && layer[layerId].options.refresh) {
                      // console.log('auto refresh', layerName, layerGroup);
                      clearTimeout(this._layers[layerName].refreshTimeout);
                      const self = this;
                      this._layers[layerName].refreshTimeout = setTimeout(() => {
                          self.loadLayer(layerName, layerGroup)
                      }, this.Layers[layerName][layerId].options.refresh);
                  }
                  */
        if (typeof (this.config.onLayerLoaded) === 'function') {
          this.config.onLayerLoaded(layerName, layerId)
        }
      } else {
        console.error('LayerBuilderNotDefined')
      }
    } catch (e) {
      console.error(e)
    }
  }

  _addSource(id, source) {
    if (!this.map.getSource(id)) {
      this.map.addSource(id, source)
    }
  }

  _request_image(imageUrl, callback) {
    /* Metodo para saltear 'CanvasRenderingContext2D': The canvas has been tainted by cross-origin data */
    const req = new XMLHttpRequest()

    req.onload = function () {
      const img = new Image()

      img.onload = function () {
        URL.revokeObjectURL(this.src)
        callback(img)
      }
      img.src = URL.createObjectURL(req.response)
    }
    req.open('get', imageUrl, true)
    req.responseType = 'blob'
    req.send()
  }

  _createLayerIcon(id, icon) {
    const self = this

    if (self.map.hasImage(id)) return true

    if (icon.iconUrl && icon.shadowUrl) {
      const size = icon.iconSize[0]// asumo que son todos iconos cuadrados

      const layerIcon = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd() {
          const canvas = document.createElement('canvas')
          canvas.width = this.width
          canvas.height = this.height
          this.context = canvas.getContext('2d')
          const { context } = this
          context.clearRect(0, 0, this.width, this.height)
          let { data } = this

          self._request_image(icon.shadowUrl, (img) => {
            context.drawImage(img, 0, 0, size, size)
            self._request_image(icon.iconUrl, (img) => {
              context.drawImage(img, 0, 0, size, size)
              data = context.getImageData(0, 0, canvas.width, canvas.height).data
            })
          })
        },

        render() {
          this.data = this.context.getImageData(0, 0, this.width, this.height).data
          return true
        }
      }
      this.map.addImage(id, layerIcon)
    } else {
      console.log('error: tipo de icono no implementado')
    }
  }

  _loadLayer(layerName, layerGroup, clustering) {
    const self = this
    const conf = layerName.indexOf('.') === -1 ? this.layersDefs[layerName] : { [layerName]: this.layersDefs[layerName.split('.')[0]][layerName.split('.')[1]] }

    this._loadingLayer = true
    Object.entries(conf).forEach((layer) => {
      switch (layer[1].format) {
        case 'geojson':
          const source = {
            type: 'geojson',
            data: layer[1].url,
            cluster: false
          }
          this._addSource(layer[0], source)
          if (layer[1].icon) this._createLayerIcon(layer[0], layer[1].icon)

          self._addLayer(layerName, layer[0], layerGroup || self._layerGroup, clustering)
          break
        case 'wms':
        case 'tms':
        default:
      }
    })
  }

  async addPublicLayer(layerName, options = {}) {
    if (!this._layers[layerName]) {
      this.inactivateMarker()
      if (this.layersDefs) {
        const layer = layerName.indexOf('.') === -1 ? this.layersDefs[layerName] : this.layersDefs[layerName.split('.')[0]][layerName.split('.')[1]]
        if (layer) {
          if (!this._layers[layerName]) {
            this._layers[layerName] = { ...this._layers[layerName], ...options }
          }
          if (options.baseLayer) this.setBaseLayer(options.baseLayer)
          else {
            this._loadLayer(layerName, this._layerGroup, options.clustering)
          }
        }
      } else if (!this.layersDefs) {
        // console.log('Must load layers defs');
        const self = this
        this.showMessage(this.config.texts[this.config.language].loadingLayers)
        await this._loadLayerDefs().then(() => {
          // self.msgControl.hide();
          // console.log("Falta poner animación de loading!")
          self.addPublicLayer(layerName, options)
        })
      }
    }
  }

  removePublicLayer(layerName) {
    if (this.layersDefs) {
      const layer = layerName.indexOf('.') === -1 ? this.layersDefs[layerName] : { [layerName]: this.layersDefs[layerName.split('.')[0]][layerName.split('.')[1]] }
      // if (this.onClickFeature) this.map.removeLayer(this.onClickFeature);
      if (layer) {
        if (this._layers[layerName]) {
          if (this._layers[layerName].baseLayer) this.setBaseLayer()
          else {
            this.map.removeLayer(layerName)
            Object.entries(layer).forEach((layer) => {
              try {
                if (!this._loadingLayer) {
                  if (this._layers[layerName].clustering) {
                    this._markersClusterLayerGroup.removeLayer(this._layers[layerName][layer[0]])
                  } else {
                    this._layerGroup.removeLayer(this._layers[layerName][layer[0]])
                  }
                }
                clearTimeout(this._layers[layerName].refreshTimeout)
              } catch (e) {
                console.error(e)
              }
            })
          }
          delete this._layers[layerName]
        }
      }
    }
  }

  addVectorTileLayer(options, icon, displayPopup = false, popupContent = '', beforeId) {
    this._loadingLayer = true
    const self = this
    const { id } = options
    this.inactivateMarker()

    if (!this._layers[id]) {
      this._layers[id] = {
        id,
        display_popup: displayPopup,
        popup_content: popupContent,
        options
      }

      this.showMessage(this.config.texts[this.config.language].loadingLayers)
      if (this.map.getSource(options.id)) {
        this.map.removeSource(options.id)
      }
      this.map.addLayer(options)

      // Change the cursor to a pointer when the mouse is over the places layer.
      this.map.on('mouseenter', id, () => {
        self.map.getCanvas().style.cursor = 'pointer'
      })

      // Change it back to a pointer when it leaves.
      this.map.on('mouseleave', id, () => {
        self.map.getCanvas().style.cursor = ''
      })

      if (displayPopup) {
        this._layers[id].popup_template = popupContent
        this.map.on('click', id, self.addVectorTilePopup.bind(this))
      }
    }

    setTimeout(() => {
      self.hideMessage()
      this._loadingLayer = false
    }, 1000)
  }

  removeVectorTileLayer(id) {
    const self = this
    if (this._layers[id]) {
      this.map.off('click', id, self.addVectorTilePopup.bind(this))
      this.map.removeLayer(id)
      delete this._layers[id]
    }
  }

  setFilter(layerId, filter) {
    if (this.map.getLayer(layerId)) {
      this.map.setFilter(layerId, filter)
    }
  }

  addVectorTilePopup(e) {
    const { properties } = e.features[0]
    const { id } = e.features[0].layer
    const template = this._layers[id].popup_content
    const content = this._template(template, properties)

    this.popup
      .setLngLat(e.lngLat)
      .setHTML(content)
      .addTo(this.map)
  }

  _template(str, data) {
    const templateRe = /\{ *([\w_-]+) *\}/g
    return str.replace(templateRe, (str, key) => {
      let value = data[key]

      if (value === undefined) {
        throw new Error(`No value provided for variable ${str}`)
      } else if (typeof value === 'function') {
        value = value(data)
      }
      return value
    })
  }

  addPopup(lngLat, content) {
    this.popup
      .setLngLat(lngLat)
      .setHTML(content)
      .addTo(this.map)
  }

  _onFeatureClick(e) {
    this.inactivateMarker()
    const layerId = e.target && e.target.options ? e.target.options.layerId : ''
    const layerName = e.target && e.target.options ? e.target.options.layerName : ''

    if (this.map.getZoom() < this.config.markerZoomInLevel) {
      this.map.flyTo({ center: e.lngLat, zoom: this.config.markerZoomInLevel })
    }

    if (e && e.features) {
      if (typeof (this.config.onFeatureClick) === 'function') {
        this.config.onFeatureClick.bind(this)(this, e.lngLat, e.features[0], layerId, layerName)
      }
    }
  }

  getFeatureProps(fid) {
    return fetch(`${this.config.layers.apiUrl}getObjectContent/?id=${fid}`)
  }

  addMarker(latlng, flag, visible = true, draggable = false, goTo, activate = true, clickable = true, options = {}) {
    const self = this

    const marker = new mapboxgl.Marker(options)
    marker
      .setLngLat(latlng).addTo(this.map)

    if (goTo) {
      this.map.flyTo({ center: latlng, zoom: this.config.markerZoomInLevel })
    }
    return marker
  }

  removeMarker(id) {
    this._markersLayerGroup.removeLayer(this._markers[id])
    this._markers[id] = undefined
    delete this._markers[id]
  }

  inactivateMarker() { }

  showMessage(text) { }

  hideMessage() { }

  getMapa() {
    return this.map
  }

  getMapEngine() {
    return mapboxgl
  }
}

const Singleton = () => {
  let instanciaMap = null
  const getInstance = (options) => {
    instanciaMap = instanciaMap || (options && new MapaInteractivoGL(options))
    return instanciaMap
  }

  return {
    getInstance
  }
}

export default Singleton().getInstance
