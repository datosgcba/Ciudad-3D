import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Checkbox, FormControlLabel, Typography
} from '@material-ui/core'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import ListItem from '@material-ui/core/ListItem'

import useFontsStyles from 'theme/fontsDecorators'

const List = ({ items }) => {
  const decorators = useFontsStyles()

  return (
    <Box>
      {
        items.map(({ subTitle, details, color }) => (
          <ListItem style={{ backgroundColor: `${color}`, paddingBottom: 0, paddingTop: 0 }}>
            <FormControlLabel
              control={(
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                  checkedIcon={<CheckBoxIcon fontSize="large" />}
                  // checked={isVisible}
                  // onChange={layerChangeHandler}
                  name={subTitle}
                />
              )}
            />
            <Typography variant="subtitle2" className={`${decorators.bold} ${decorators.grey333}`}>
              {subTitle}
              <Typography variant="subtitle2" className={`${decorators.grey333}`}>
                {details}
              </Typography>
            </Typography>

          </ListItem>
        ))
      }
    </Box>
  )
}

List.propTypes = {
  items: PropTypes.string.isRequired
}

export default List
