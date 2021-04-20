import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, Grid, makeStyles
} from '@material-ui/core'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'
import SelectParcel from 'components/Sections/SubSection/SelectParcel'

import { useSelector } from 'react-redux'

import { getBasicData } from 'utils/configQueries'

import useStyles from './styles'

const Details = ({
  classes, decorators, title, value, format
}) => (
  <Box className={classes.card}>
    <Grid container>
      <Grid item xs={7}>
        <Typography variant="subtitle2" className={decorators.bold}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="subtitle2" className={`${classes.value}`}>
          {`${value} ${format}`}
        </Typography>
      </Grid>
    </Grid>
  </Box>
)

const BasicData = () => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const data = useSelector((state) => state.basicData.data)
  const isSelected = useSelector((state) => state.basicData.isSelected)

  return (
    <ContainerBar
      type="list"
    >
      { isSelected && (
        <Box>
          {
            getBasicData().map(({
              title,
              fill,
              format,
              isNumber
            }, index) => (
              <Details
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                classes={classes}
                decorators={decorators}
                title={title}
                value={isNumber && data[fill] ? Number.parseFloat(data[fill]).toLocaleString('es-AR') : data[fill]}
                format={format}
              />
            ))
          }
        </Box>
      )}
      { !isSelected && <SelectParcel />}
    </ContainerBar>
  )
}

Details.propTypes = {
  classes: PropTypes.objectOf(makeStyles).isRequired,
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  format: PropTypes.string.isRequired
}

Details.defaultProps = {
  value: ''
}

export default BasicData
