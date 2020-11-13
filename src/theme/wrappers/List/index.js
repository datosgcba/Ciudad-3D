import React from 'react'

import PropTypes from 'prop-types'

import {
  Box, Checkbox, FormControlLabel, Typography
} from '@material-ui/core'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import ListItem from '@material-ui/core/ListItem'

import useFontsStyles from 'theme/fontsDecorators'
import useStyles from './styles'

const handleChange = (id) => (_, isChecked) => {
  console.log('id', id)
  console.log('isChecked', isChecked)
}
const ListItems = ({
  id, decorators, subTitle, details, color
}) => (
  <ListItem style={{ backgroundColor: `${color}`, paddingBottom: 0, paddingTop: 0 }}>
    <FormControlLabel
      control={(
        <Checkbox
          defaultChecked
          icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
          checkedIcon={<CheckBoxIcon fontSize="large" />}
          onChange={handleChange(id)}
        />
      )}
    />
    <Typography variant="subtitle2" className={`${decorators.grey333} ${decorators.bold}`}>
      {`${subTitle}`}
      <Box>
        <Typography variant="subtitle2" className={`${decorators.grey333}`}>
          {details}
        </Typography>
      </Box>
    </Typography>
  </ListItem>
)

const List = ({ items }) => {
  const decorators = useFontsStyles()
  const classes = useStyles()
  return (
    <Box className={classes.options}>
      {
        items.map(({
          subTitle, details, color, id
        }) => (
          <ListItems
            // eslint-disable-next-line react/no-array-index-key
            key={id}
            id={id}
            decorators={decorators}
            subTitle={subTitle}
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
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}
ListItems.defaultProps = {
  subTitle: ''
}

export default List
