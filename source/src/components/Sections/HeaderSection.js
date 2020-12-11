import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, IconButton
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

import CustomTooltip from 'theme/wrappers/CustomTooltip'

import { actions as alertsAction } from 'state/ducks/alerts'
import { actions as categoriesActions } from 'state/ducks/categories'

import { useDispatch } from 'react-redux'

import useFontsStyles from 'theme/fontsDecorators'
import useStyles from './headerSectionStyles'

const HeaderSection = ({ categoryTitle, sectionTitle, info }) => {
  const classes = useStyles()
  const decorators = useFontsStyles()
  const dispatch = useDispatch()

  return (
    <Box className={classes.container}>
      <Typography variant="h5" className={`${decorators.bold} ${decorators.marginBottom_ml}`}>
        {categoryTitle}
      </Typography>
      {
        sectionTitle && (
          <Box className={classes.subTitle}>
            <Box className={info ? classes.sectionTitle : ''}>
              <Typography variant="h6" className={decorators.bold}>
                <IconButton
                  onClick={() => {
                    dispatch(categoriesActions.sectionBack())
                    dispatch(alertsAction.clear())
                  }}
                  className={classes.button}
                >
                  <ArrowBackIcon />
                </IconButton>
                {sectionTitle}
              </Typography>
            </Box>
            {
              info && (
                <Box className={classes.boxIcons}>
                  <CustomTooltip
                    className={classes.tooltip}
                    title={info}
                    placement="top"
                  >
                    <InfoOutlinedIcon
                      className={classes.info}
                    />
                  </CustomTooltip>
                </Box>
              )
            }
          </Box>
        )
      }
    </Box>
  )
}

HeaderSection.defaultProps = {
  sectionTitle: '',
  info: ''
}

HeaderSection.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
  sectionTitle: PropTypes.string,
  info: PropTypes.string
}

export default HeaderSection
