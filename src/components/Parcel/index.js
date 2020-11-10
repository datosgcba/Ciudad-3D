import React from 'react'

import { useSelector } from 'react-redux'

import Polygon from './Polygon'

const Parcel = () => {
  const smpParcel = useSelector((state) => state.parcel.smp)
  const geomCoords = useSelector((state) => state.parcel.geomCoords)
  const isVisible = useSelector((state) => state.parcel.isVisible)

  return (
    <>
      {isVisible && smpParcel && geomCoords && <Polygon smp={smpParcel} geomCoords={geomCoords} />}
    </>
  )
}

export default Parcel
