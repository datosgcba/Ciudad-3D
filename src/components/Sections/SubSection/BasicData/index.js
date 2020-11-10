import React from 'react'

import PropTypes from 'prop-types'

import {
  Paper, Box, Typography, Grid, makeStyles
} from '@material-ui/core'

import useFontsStyles from 'theme/fontsDecorators'

import ContainerBar from 'components/Sections/ContainerBar'

import { useSelector } from 'react-redux'

import { getBasicData } from 'utils/configQueries'

import useStyles from './styles'

const Details = ({
  classes, decorators, title, fill, format
}) => (
  <Box className={classes.card}>
    <Grid container>
      <Grid item xs={7}>
        <Typography variant="subtitle2" className={decorators.bold}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={5} className={classes.gridItem}>
        <Typography variant="subtitle2" className={`${classes.value}`}>
          {`${fill} ${format}`}
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
        <Box className={classes.details}>
          {
            getBasicData().map(({ title, fill, format }, index) => (
              <Details
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                classes={classes}
                decorators={decorators}
                title={title}
                fill={data[fill]}
                format={format}
              />
            ))
          }
        </Box>
      )}
      { !isSelected && (
        <Paper className={classes.paper}>
          <Typography variant="body1" className={classes.body1}>
            Seleccione una parcela
          </Typography>
        </Paper>
      )}
    </ContainerBar>
  )
}

Details.propTypes = {
  classes: PropTypes.objectOf(makeStyles).isRequired,
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  fill: PropTypes.string,
  format: PropTypes.string.isRequired
}

Details.defaultProps = {
  fill: ''
}

export default BasicData
