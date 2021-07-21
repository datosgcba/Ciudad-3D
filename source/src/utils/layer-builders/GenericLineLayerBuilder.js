function getLayer(source, coordinateConversion, style) {
  const layer = {
    id: source,
    source,
    type: 'line',
    paint: {
      'line-width': 6,
      'line-color': style.color ? style.color : '#DD0083',
      'line-opacity': style.opacity ? style.opacity : 1
    }

  }

  return layer
}

export default getLayer
