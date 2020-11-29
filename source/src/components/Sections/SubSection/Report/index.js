import React, { useEffect } from 'react'

import ContainerBar from 'components/Sections/ContainerBar'
import { actions } from 'state/ducks/reports'
import { useDispatch, useSelector } from 'react-redux'

const Report = () => {
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.parcel.smp)
  const reports = useSelector((state) => state.reports)
  useEffect(() => {
    if (smp !== null) {
      dispatch(actions.getData(smp))
    }
  }, [dispatch, smp])
  return (
    <ContainerBar
      type="list"
    >
      {
        Object.entries(reports).map(([key, value]) => `${key}: ${value.state}`)
      }
    </ContainerBar>
  )
}

export default Report
