import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Typography, IconButton
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

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
    <>
      <Typography variant="h5" className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_ml}`}>
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
          </Typography>
        </Box>
        )
      }
    </>
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
