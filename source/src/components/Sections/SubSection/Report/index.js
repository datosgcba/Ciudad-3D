import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import {
  Typography,
  IconButton,
  CircularProgress,
  Card,
  Tooltip
} from '@material-ui/core'
import { Warning } from '@material-ui/icons'

import ContainerBar from 'components/Sections/ContainerBar'
import { actions } from 'state/ducks/reports'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'

const Item = ({ smp, address, cadLink, state, onClick }) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <Typography>SMP: {smp}:</Typography>
      <Tooltip title="descarga Archivo CAD">
        <IconButton
          onClick={() => window.open(cadLink, '_blank')}
          className={classes.icon}
        >
          <img
            src="https://epok.buenosaires.gob.ar/media/repok/uploads/mapainteractivoba/Archivo_CAD__.png"
            width="24px"
          />
        </IconButton>
      </Tooltip>
      {state === 'ready' && (
        <Tooltip title="descarga Certificado Urbanístico">
          <IconButton onClick={() => onClick('PDF')} className={classes.icon}>
            <img
              src="https://epok.buenosaires.gob.ar/media/repok/uploads/mapainteractivoba/Certificado_Urbanistico_.png"
              width="24px"
            />
          </IconButton>
        </Tooltip>
      )}
      {state === 'loading' && (
        <CircularProgress className={classes.icon} size={20} />
      )}
      {state === 'error' && (
        <Tooltip title="No disponible actualmente">
          <Warning className={classes.icon} size={20} />
        </Tooltip>
      )}
      <Typography>Dirección: {address}</Typography>
    </Card>
  )
}
const Report = () => {
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.parcel.smp)
  const reports = useSelector((state) => state.reports)

  const handleOnClick = (type, key) => {
    switch (type) {
      case 'PDF':
        dispatch(actions.download(key))
        break
    }
  }

  useEffect(() => {
    if (smp !== null) {
      dispatch(actions.getData(smp))
    }
  }, [dispatch, smp])

  return (
    <ContainerBar type="list">
      {Object.entries(reports).map(([key, { state, address, cadLink }]) => (
        <Item
          key={key}
          smp={key}
          state={state}
          address={address}
          cadLink={cadLink}
          onClick={(type) => handleOnClick(type, key)}
        />
      ))}
    </ContainerBar>
  )
}

Item.propTypes = {
  smp: PropTypes.string,
  state: PropTypes.string,
  onClick: PropTypes.func,
  address: PropTypes.string
}

Item.defaultProps = {
  smp: '',
  state: '',
  onClick: '',
  address: ''
}

export default Report
