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
  const selectedOption = sectionId[0].toLowerCase()

  const { title, info } = lastIndex > 0
    ? getSectionInfo(selectedOption, sectionId[lastIndex]) : { title: null, info: null }

  const maxHeight = sectionId.length > 1
    ? '80vh' : '85vh'

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
        <Box className={classes.padding} style={{ maxHeight }}>
          <Alerts />
          {children}
        </Box>
      </Scrollbar>
    </Box>
  )
}
ContainerBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  type: PropTypes.string.isRequired
}

export default ContainerBar
