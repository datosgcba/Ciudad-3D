import { useEffect } from 'react'

import { actions as parcelActions } from 'state/ducks/parcel'

import { useDispatch, useSelector } from 'react-redux'

const Parcel = ({ smp }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(parcelActions.smpSelected(smp))
  }, [smp])

  // Se obtienen las coordenadas geometricas de la parcela
  const geomCoords = useSelector((state) => state.parcel.geomCoords)
  // TODO: sacar console.log()
  // eslint-disable-next-line no-console
  console.log('geomCoord: ', geomCoords)

  return null
}

export default Parcel
