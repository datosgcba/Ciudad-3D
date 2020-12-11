import React from 'react'

import { Box, Paper } from '@material-ui/core'
import Scrollbar from 'react-smooth-scrollbar'

import { getCategoryTitle, getSectionInfo } from 'utils/configQueries'

import { useSelector } from 'react-redux'

import Alerts from 'components/Alerts'
import HeaderSection from 'components/Sections/HeaderSection'

import PropTypes from 'prop-types'
import useStyles from './ContainerBarStyles'

const ContainerBar = ({ children, type }) => {
  const classes = useStyles()

  const sectionId = useSelector((state) => state.categories.sectionId)
  const categoryTitle = getCategoryTitle(sectionId[0])

  const lastIndex = sectionId.length - 1
  const { title, info } = lastIndex > 0
    ? getSectionInfo(sectionId[lastIndex]) : { title: null, info: null }

  return (
    <Box className={`${classes[type]} ${classes.container} ${classes.responsive}`}>
      <Paper elevation={2} className={classes.padding}>
        <HeaderSection
          categoryTitle={categoryTitle}
          sectionTitle={title}
          info={info}
        />
      </Paper>

      <Scrollbar>
        <Box className={`${classes.children} ${classes.padding}`}>
          <Alerts />
          {children}
        </Box>
      </Scrollbar>
    </Box>
  )
}
ContainerBar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired
}

export default ContainerBar
