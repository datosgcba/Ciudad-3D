// TODO: proptypes
/* eslint-disable react/prop-types */
import React, {
  useEffect, useRef, useState, cloneElement
} from 'react'

import MapaInteractivoGL from 'utils/MapaInteractivoGL'

export default ({ coords, children }) => {
  const refPopup = useRef(null)
  const refPopupContent = useRef(null)
  const [popup, setPopup] = useState(null)
  useEffect(() => {
    if (popup === null) {
      const engine = MapaInteractivoGL().getMapEngine()
      setPopup(new engine.Popup())
    }
  }, [popup, refPopup])

  useEffect(() => {
    if (popup && refPopupContent.current) {
      popup.setLngLat([coords.lng, coords.lat])
      popup.setDOMContent(refPopupContent.current)
    }
  }, [coords.lat, coords.lng, popup, refPopupContent])

  useEffect(() => {
    if (popup && coords) {
      popup.setLngLat([coords.lng, coords.lat])
    }
  }, [popup, coords])

  useEffect(() => {
    if (popup && !popup.isOpen()) {
      const mapUtils = MapaInteractivoGL()
      popup.addTo(mapUtils.map)
      popup.setDOMContent(refPopupContent.current)
    }
    return () => {
      if (popup) {
        popup.remove()
      }
    }
  })

  // {refPopup.current && cloneElement(children, { ref: refPopupContent })}
  return (
    <div ref={refPopup}>
      {refPopup.current && cloneElement(children, { ref: refPopupContent })}
    </div>
  )
}
