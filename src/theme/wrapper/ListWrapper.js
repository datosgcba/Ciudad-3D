import React from 'react'

import {
  Box, Checkbox, FormControlLabel, Typography
} from '@material-ui/core'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import ListItem from '@material-ui/core/ListItem'

import ListWapperStyles from 'theme/wrapper/ListWrapperStyles'
import useFontsStyles from 'theme/fontsDecorators'

import PropTypes from 'prop-types'

const ListWrapper = ({ items }) => {
  const classes = ListWapperStyles()
  const decorators = useFontsStyles()

  return (
    <Box>
      {
        items.map(({ subTitle, details, color }) => (
          <ListItem style={{ backgroundColor: `${color}`, paddingBottom: 0, paddingTop: 0 }}>
            <FormControlLabel
              className={classes.formControl}
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
            <Typography variant="subtitle2" className={`${decorators.bold} ${decorators.grey1}`}>
              {subTitle}
              <Typography variant="subtitle2" className={`${decorators.grey1}`}>
                {details}
              </Typography>
            </Typography>

          </ListItem>
        ))
      }
    </Box>
  )
}

ListWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.string.isRequired
}

export default ListWrapper
