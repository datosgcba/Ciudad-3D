import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  InputAdornment
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'

import { actions as alertsActions } from 'state/ducks/alerts'
import { actions as buildableActions } from 'state/ducks/buildable'

import { useDispatch, useSelector } from 'react-redux'

import { getBuildable } from 'utils/configQueries'

import useStyles from './styles'

const ItemValues = ({ children }) => {
  const values = children instanceof Array ? children : [children]
  return values.map((v) => (
    `${v} `
  ))
}
const Details = ({
  classes, title, data, items, isArea, isPlusvalia, smp, decorators, isEditing, setIsEditing
}) => {
  const dispatch = useDispatch()
  const [areaValue, setAreaValue] = useState(0)

  const handleOnAreaChange = (ev) => setAreaValue(ev.target.value)

  useEffect(() => {
    if (isArea) {
      dispatch(buildableActions.areaChanged({ smp, text: areaValue }))
    }
  }, [dispatch, smp, areaValue, isArea])

  return (
    <Box className={classes.subDetails}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle3" className={decorators.bold}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          {
            items && items.map(({ label, field, unidad }) => (
              <ListItem className={classes.listado}>
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
                        <ItemValues>
                          {
                            field
                              .split('.')
                              .reduce((p, c) => p && p[c], data)
                          }
                        </ItemValues>
                        {unidad}
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
        </Grid>
      </Grid>
    </Box>
  )
}

const Buildable = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const data = useSelector((state) => state.buildable.data)
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.basicData.data.smp)
  const isSelected = useSelector((state) => state.buildable.isSelected)
  const isLoading = useSelector((state) => state.buildable.isLoading)
  const [isEditing, setIsEditing] = useState(false)
  const plusvalia = useSelector((state) => state.buildable.plusvalia)

  useEffect(() => {
    dispatch(buildableActions.clickOnParcel(smp))
    // Prueba de alerta, suponiendo que es una esquina y tiene rivolta
    dispatch(alertsActions.clear())
    dispatch(alertsActions.addId('C'))
  }, [dispatch, smp])
  return (
    <ContainerBar
      type="list"
    >
      {
        getBuildable().map(({
          title, items, isArea, isPlusvalia
        }, index) => (
          isSelected && (
            <Details
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              classes={classes}
              decorators={decorators}
              title={title}
              items={items}
              data={isPlusvalia && isEditing ? plusvalia : data}
              isArea={isArea}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isPlusvalia={isPlusvalia}
              smp={smp}
            />
          )
        ))
      }
      { !isSelected && !isLoading && (
        <Paper className={classes.paper}>
          <Typography variant="body1" className={classes.body1}>
            Seleccione una parcela
          </Typography>
        </Paper>
      )}
      { isLoading && (
        <Typography variant="body1" className={classes.body1}>
          Cargando...
        </Typography>
      )}
    </ContainerBar>
  )
}

Details.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.object).isRequired,
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isArea: PropTypes.bool.isRequired,
  isPlusvalia: PropTypes.bool.isRequired,
  smp: PropTypes.string.isRequired
}

export default Buildable
