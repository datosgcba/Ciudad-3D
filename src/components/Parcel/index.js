import React, { useEffect } from 'react'

import { actions as parcelActions } from 'state/ducks/parcel'

import { useSelector, useDispatch } from 'react-redux'

import Polygon from './Polygon'

const Parcel = () => {
  const dispatch = useDispatch()

  const smpPlace = useSelector((state) => state.seeker.place.data.smp)
  const smpBasicData = useSelector((state) => state.basicData.data.smp)
  const smpParcel = useSelector((state) => state.parcel.smp)
  const geomCoords = useSelector((state) => state.parcel.geomCoords)

  // Se actualizan las coordenadas geométricas de la Parcela
  // con el smp obtenido al hacer click en una parcela
  useEffect(() => {
    dispatch(parcelActions.smpSelected(smpBasicData))
  }, [smpBasicData])

  // Se actualizan las coordenadas geométricas de la Parcela
  // con el smp obtenido al utilizar el buscador
  useEffect(() => {
    dispatch(parcelActions.smpSelected(smpPlace))
  }, [smpPlace])

  return (
    <Polygon smp={smpParcel} geomCoords={geomCoords} />
  )
}

export default Parcel
