import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import {
  Box,
  Typography,
  Paper,
  Grid,
  ListItem
} from '@material-ui/core'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'

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
  classes, title, data, items, decorators
}) => (
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
                <ItemValues>{field.split('.').reduce((p, c) => p && p[c], data)}</ItemValues>
                {unidad}
              </ListItem>
            ))
        }
      </Grid>
    </Grid>
  </Box>
)

const Buildable = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const data = useSelector((state) => state.buildable.data)
  const dispatch = useDispatch()
  const smp = useSelector((state) => state.basicData.data.smp)
  const isSelected = useSelector((state) => state.buildable.isSelected)
  const isLoading = useSelector((state) => state.buildable.isLoading)

  useEffect(() => {
    dispatch(buildableActions.clickOnParcel(smp))
  }, [dispatch, smp])
  return (
    <ContainerBar>
      {
        getBuildable().map(({
          title, items, fill, field, fillPL, fillSL, subtitle, subtitlePL, subtitleSL, format
        }, index) => (
          isSelected && (
            <Details
            // eslint-disable-next-line react/no-array-index-key
              key={index}
              classes={classes}
              decorators={decorators}
              title={title}
              items={items}
              data={data}
              fill={data[fill]}
              field={field}
              subtitle={subtitle}
              subtitlePL={subtitlePL}
              subtitleSL={subtitleSL}
              fillPL={data[fillPL]}
              fillSL={data[fillSL]}
              format={format}
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
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Buildable
