import { promisify } from 'util'

/**
 * Esta función los convierte en promesas eventos de mapbox que reciben callbak
 * Cuando los callbacks reciben parametros, estos son envidos como un array.
 * Esta función debería usarse principalmente dentro de llamadas al middleware
 * @param {*} map
 * @param {*} eventName
 */
const mapOnPromise = (map) => {
  if (map[promisify.custom] === undefined) {
    // Se desabilita basado en el ejemplo de promisify custom
    // https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_custom_promisified_functions
    // eslint-disable-next-line no-param-reassign
    map.on[promisify.custom] = (eventName) => new Promise((resolve, reject) => {
      try {
        map.on(eventName, (...args) => {
          resolve(...args)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  return promisify(map.on)
}

/**
 * Para las capas custom cuando se indica icon-image se corresponde al id de la imagen
 * mapbox necesita que al agregar las capas sus iconos se referencien por id
 */
const loadImages = async (map, images) => Promise.all(
  images.map(({ id, data }) => promisify(map.loadImage.bind(map))(data)
    .then((image) => {
      map.addImage(id, image)
    }))
)

export { loadImages, mapOnPromise }
