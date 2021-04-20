import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import {
  Typography, IconButton, CircularProgress, Card
} from '@material-ui/core'
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined'
import Error from '@material-ui/icons/Error'

import ContainerBar from 'components/Sections/ContainerBar'
import { actions } from 'state/ducks/reports'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'

const Item = ({
  smp, address, state, onClick
}) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <Typography>
        SMP:
        {' '}
        {smp}
        :
      </Typography>
      {
        state === 'ready' && (
          <IconButton
            onClick={onClick}
            className={classes.icon}
          >
            <CloudDownloadOutlinedIcon />
          </IconButton>
        )
      }
      {
        state === 'loading' && (
          <CircularProgress
            className={classes.icon}
            size={20}
          />
        )
      }
      {
        state === 'error' && (
          <Error />
        )
      }
      <Typography>
        Dirección:
        {' '}
        {address}
      </Typography>
    </Card>
  )
}
const Report = () => {
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.parcel.smp)
  const reports = useSelector((state) => state.reports)

  const handleOnClick = (key) => dispatch(actions.download(key))
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
        Object.entries(reports).map(
          ([key, { state, address }]) => (
            <Item
              key={key}
              smp={key}
              state={state}
              address={address}
              onClick={() => handleOnClick(key)}
            />
          )
        )
      }
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
