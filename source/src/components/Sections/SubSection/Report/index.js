import React, { useEffect } from 'react'

import {
  Box, Typography, IconButton, CircularProgress
} from '@material-ui/core'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import Error from '@material-ui/icons/Error'

import ContainerBar from 'components/Sections/ContainerBar'
import { actions } from 'state/ducks/reports'
import { useDispatch, useSelector } from 'react-redux'

const Item = ({ smp, state, onClick }) => (
  <Box>
    <Typography>{smp}: 
    {
      state === 'ready' && (
        <IconButton onClick={onClick}>
          <DownloadIcon />
        </IconButton>
      )
    }
    {
      state === 'loading' && (
        <CircularProgress />
      )
    }
    {
      state === 'error' && (
        <Error />
      )
    }
    </Typography>
  </Box>
)

const Report = () => {
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.parcel.smp)
  const reports = useSelector((state) => state.reports)
  const handleOnClick = (smp) => dispatch(actions.download(smp))
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
        Object.entries(reports).map(([key, { state }]) => <Item key={key} smp={key} state={state} onClick={() => handleOnClick(key)}/>)
      }
    </ContainerBar>
  )
}

export default Report
