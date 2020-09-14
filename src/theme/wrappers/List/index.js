import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Checkbox, FormControlLabel, Typography
} from '@material-ui/core'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import ListItem from '@material-ui/core/ListItem'

import useFontsStyles from 'theme/fontsDecorators'

const ListItems = ({
  decorators, subTitle, details, color
}) => (
  <ListItem style={{ backgroundColor: `${color}`, paddingBottom: 0, paddingTop: 0 }}>
    <FormControlLabel
      control={(
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
          checkedIcon={<CheckBoxIcon fontSize="large" />}
          name={subTitle}
        />
      )}
    />
    <Typography variant="subtitle2" className={`${decorators.grey333}`}>
      {details}
    </Typography>
  </ListItem>
)

const List = ({ items }) => {
  const decorators = useFontsStyles()

  return (
    <Box>
      {
        items.map(({ subTitle, details, color }) => (
          <ListItems
            key={subTitle}
            decorators={decorators}
            subTItle={subTitle}
            details={details}
            color={color}
          />
        ))
      }
    </Box>
  )
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}
ListItems.propTypes = {
  decorators: PropTypes.objectOf(PropTypes.string).isRequired,
  subTitle: PropTypes.string,
  details: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}
ListItems.defaultProps = {
  subTitle: ''
}

export default List
