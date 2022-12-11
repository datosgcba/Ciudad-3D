import { Height } from '@material-ui/icons'
import { promisify } from 'util'

/**
 * Esta función los convierte en promesas eventos de maplibre que reciben callbak
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
    map.on[promisify.custom] = (eventName) =>
      new Promise((resolve, reject) => {
        try {
          map.on(eventName, (...args) => {
            resolve(map, ...args)
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
 * maplibre necesita que al agregar las capas sus iconos se referencien por id
 */
const loadImages = async (map, images) => {
  await Promise.allSettled(
    images
      .flat()
      .filter(({ data }) => data)
      .map(({ id, data }) =>
        promisify(map.loadImage.bind(map))(data).then((image) => {
          map.addImage(id, image)
        })
      )
  )
}

const mergeImages = async (map, images) => {
  const ids = images.map(({ id }) => id)
  const id = ids.join('_')

  const imageData = map.style.imageManager.images[ids[0]].data

  for (let idxImg = 1; idxImg < ids.length; idxImg++) {
    const { data: bytes } = map.style.imageManager.images[ids[idxImg]].data

    for (
      let idx = 0;
      idx < imageData.data.length && idx < bytes.length;
      idx += 4
    ) {
      if (bytes[idx + 3] > 128) {
        imageData.data[idx] = bytes[idx]
        imageData.data[idx + 1] = bytes[idx + 1]
        imageData.data[idx + 2] = bytes[idx + 2]
        imageData.data[idx + 3] = bytes[idx + 3]
      }
    }
  }

  map.addImage(id, imageData)
}

export { loadImages, mapOnPromise, mergeImages }
