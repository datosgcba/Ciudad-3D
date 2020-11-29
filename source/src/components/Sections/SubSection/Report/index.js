import React, { useEffect } from 'react'

import ContainerBar from 'components/Sections/ContainerBar'
import { actions } from 'state/ducks/report'
import { useDispatch, useSelector } from 'react-redux'

const Report = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.reportRequested())
  }, [dispatch])
  return (
    <ContainerBar
      type="list"
    >
      Reporte
    </ContainerBar>
  )
}

export default Report
