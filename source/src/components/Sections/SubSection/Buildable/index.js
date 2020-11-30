import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import {
  Typography,
  Grid,
  IconButton,
  ListItem,
  TextField,
  InputAdornment
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import Tooltip from '@material-ui/core/Tooltip'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'
import SelectParcel from 'components/Sections/SubSection/SelectParcel'

import { actions as buildableActions } from 'state/ducks/buildable'

import { useDispatch, useSelector } from 'react-redux'

import { getBuildable } from 'utils/configQueries'

import useStyles from './styles'

const ItemValues = ({ children, unit }) => {
  const values = children instanceof Array ? children : [children]
  return values.map((v, idx) => (
    `${idx > 0 ? ' | ' : ''} ${v === undefined ? '' : v} ${unit || ''}`
  ))
}
const Details = ({
  classes, title, data, items, isArea,
  smp, decorators, isEditing, setIsEditing, info
}) => {
  const dispatch = useDispatch()
  const [areaValue, setAreaValue] = useState(0)

  const handleOnAreaChange = ({ target: { value } }) => {
    const newAreaValue = Number.parseInt(value, 10)
    setAreaValue(
      Number.isNaN(newAreaValue)
        ? areaValue
        : Math.abs(newAreaValue)
    )
  }

  useEffect(() => {
    if (isArea) {
      dispatch(buildableActions.areaChanged({ smp, text: areaValue }))
    }
  }, [dispatch, smp, areaValue, isArea])

  return (
    <>
      <Typography variant="subtitle2" className={decorators.bold}>
        {title}
        {
          info && (
            <Tooltip
              className={classes.info}
              title={info}
              placement="top"
            >
              <InfoOutlinedIcon
                fontSize="small"
              />
            </Tooltip>
          )
        }
      </Typography>
      {
        items && items.map(({ label, field, unidad }, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={idx} className={classes.listado}>
            {label}
            {
              isArea && isEditing
                ? (
                  <TextField
                    className={classes.input}
                    value={areaValue}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">{unidad}</InputAdornment>
                    }}
                    onChange={handleOnAreaChange}
                  />
                )
                : (
                  <>
                    <ItemValues unit={unidad}>
                      {
                        field
                          .split('.')
                          .reduce((p, c) => p && p[c], data)
                      }
                    </ItemValues>
                  </>
                )
            }
            {
              isArea && (
                <IconButton
                  onClick={() => setIsEditing(!isEditing)}
                  className={classes.button}
                >
                  <EditIcon color={isEditing ? 'primary' : 'inherit'} />
                </IconButton>
              )
            }
          </ListItem>
        ))
      }
    </>
  )
}

const Buildable = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const data = useSelector((state) => state.buildable.data)
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.parcel.smp)
  const isLoading = useSelector((state) => state.buildable.isLoading)
  const [isEditing, setIsEditing] = useState(false)
  const plusvalia = useSelector((state) => state.buildable.plusvalia)

  useEffect(() => {
    dispatch(buildableActions.clickOnParcel(smp))
  }, [dispatch, smp])
  return (
    <ContainerBar
      type="list"
    >
      <Grid container className={classes.grid}>
        {
          getBuildable().map(({
            title, items, isArea, isPlusvalia, large, info
          }, index) => {
            const maxWidth = large === 6 ? 'small' : null
            return (
              smp && !isLoading && (
                <Grid item xs={large} className={`${classes.gridItem} ${classes[maxWidth]} `}>
                  <Details
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    classes={classes}
                    decorators={decorators}
                    title={title}
                    items={items}
                    info={info}
                    data={isPlusvalia && isEditing ? plusvalia : data}
                    isArea={isArea}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    smp={smp}
                  />
                </Grid>
              )
            )
          })
        }
      </Grid>
      { !smp && !isLoading && <SelectParcel />}
      { isLoading && (
        <Typography variant="body1">
          Cargando...
        </Typography>
      )}
    </ContainerBar>
  )
}

Details.defaultProps = {
  isArea: false,
  info: ''
}
Details.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  info: PropTypes.string,
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isArea: PropTypes.bool,
  smp: PropTypes.string.isRequired
}

export default Buildable
