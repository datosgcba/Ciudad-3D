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

const ListItems = ({
  decorators, subTitle, details, color
}) => (
  <ListItem style={{ backgroundColor: `${color}`, paddingBottom: 0, paddingTop: 0 }}>
    <FormControlLabel
      control={(
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
          checkedIcon={<CheckBoxIcon fontSize="large" />}
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
        items.map(({ subTitle, details, color }, idx) => (
          <ListItems
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
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
  color: PropTypes.string.isRequired
}
ListItems.defaultProps = {
  subTitle: ''
}

export default List
