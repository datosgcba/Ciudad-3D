import React from 'react'

import PropTypes from 'prop-types'

import { Box } from '@material-ui/core'

import Category from './Category'
import useStyles from './style'

const Categories = ({ data }) => {
  const classes = useStyles()

  return (
    <Box className={classes.options}>
      {
        data.map(({ id, path, title }) => (
          <Category
            id={id}
            path={path}
            title={title}
          />
        ))
      }
    </Box>
  )
}

Categories.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Categories
