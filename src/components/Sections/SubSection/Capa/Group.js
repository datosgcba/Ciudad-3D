import React from 'react'

import { Container, Typography } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'

import GroupItems from 'components/Sections/SubSection/Capa/GroupItems'
import PropTypes from 'prop-types'
import useStyles from './groupStyle'

const Group = ({ id, title }) => {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <Typography variant="subtitle1">
        {title.toUpperCase()}
        <Divider className={classes.divider} />
      </Typography>
      <List dense>
        <GroupItems idGroup={id} classes={classes} />
      </List>
    </Container>
  )
}

Group.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Group
