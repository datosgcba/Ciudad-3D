import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, IconButton
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import Tooltip from '@material-ui/core/Tooltip'

import { actions as alertsAction } from 'state/ducks/alerts'
import { actions as categoriesActions } from 'state/ducks/categories'

import { useDispatch } from 'react-redux'

import useFontsStyles from 'theme/fontsDecorators'
import useStyles from './headerSectionStyles'

const HeaderSection = ({ categoryTitle, sectionTitle }) => {
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
              {
                sectionTitle === 'Datos Básicos' && (
                  <Tooltip
                    className={classes.info}
                    title="Esta información es relevada por la AGIP. Si los datos plasmados no coinciden con la realidad, se solicita ratificarlos ante dicho organismo."
                    placement="top"
                  >
                    <InfoOutlinedIcon
                      fontSize="small"
                    />
                  </Tooltip>
                )
              }
            </Typography>
          </Box>
        )
      }
    </Box>
  )
}

HeaderSection.defaultProps = {
  sectionTitle: ''
}

HeaderSection.propTypes = {
  categoryTitle: PropTypes.string.isRequired,
  sectionTitle: PropTypes.string
}

export default HeaderSection
