import { actions as parcelActions } from 'state/ducks/parcel'

import { useDispatch } from 'react-redux'

const Parcel = ({ smp }) => {
  const dispatch = useDispatch()

  // Se obtienen las coordenadas geometricas de la parcela
  dispatch(parcelActions.smpSelected(smp))

  return null
}

export default Parcel
