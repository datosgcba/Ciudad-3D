function getLayer(source, coordinateConversion, style, icon) {
  const layer = {
    id: source,
    source
  }
  if (icon) {
    layer.type = 'symbol'
    layer.layout = {
      'icon-allow-overlap': true,
      'icon-image': source
    }
  }

  return layer
}

export default getLayer
