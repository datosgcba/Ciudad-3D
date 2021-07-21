import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'

import Polygon from './Polygon'

const Parcel = () => {
  const smpParcel = useSelector((state) => state.parcel.smp)
  const geomCoords = useSelector((state) => state.parcel.geomCoords)
  const isVisible = useSelector((state) => state.parcel.isVisible)
  const [smpList, setSmpList] = useState([])

  useEffect(() => {
    setSmpList(smpParcel ? [...smpList, smpParcel] : [])
  }, [smpParcel])

  return (
    <>
      {isVisible && geomCoords?.length && <Polygon smpList={smpList} geomCoords={geomCoords} />}
    </>
  )
}

export default Parcel
