import React from 'react'

import { Paper } from '@material-ui/core'
import Scrollbar from 'react-smooth-scrollbar'

import { getCategoryTitle, getSectionTitle } from 'utils/configQueries'

import { useSelector } from 'react-redux'

import Alerts from 'components/Alerts'
import HeaderSection from 'components/Sections/HeaderSection'

import PropTypes from 'prop-types'
import useStyles from './ContainerBarWorksStyles'

const ContainerBarWorks = ({ children }) => {
  const classes = useStyles()

  const sectionId = useSelector((state) => state.categories.sectionId)
  const categoryTitle = getCategoryTitle(sectionId[0])

  const lastIndex = sectionId.length - 1
  let sectionTitle = null
  if (lastIndex > 0) {
    sectionTitle = getSectionTitle(sectionId[lastIndex])
  }

  return (
    <Scrollbar>
      <Paper className={classes.paper}>
        <HeaderSection
          categoryTitle={categoryTitle}
          sectionTitle={sectionTitle}
        />
        <Alerts />
        {children}
      </Paper>
    </Scrollbar>
  )
}
ContainerBarWorks.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default ContainerBarWorks
