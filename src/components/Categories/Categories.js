import React, { useState } from 'react'

import PropTypes from 'prop-types'

import { Box } from '@material-ui/core'

import Category from './Category'
import useStyles from './style'

const Categories = ({ data }) => {
  const [categorySelected, setCategorySelected] = useState('')
  const classes = useStyles()

  return (
    <Box className={classes.options}>
      {
        data.map(({ path, title }) => (
          <Category
            onToggle={(isToggleOn) => setCategorySelected(isToggleOn ? title : '')}
            path={path}
            title={title}
            isSelected={categorySelected === title}
          />
        ))
      }
    </Box>
  )
}

Categories.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Categories
