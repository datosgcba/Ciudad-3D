import React from 'react'

import PropTypes from 'prop-types'

import {
  Checkbox, Container, FormControlLabel, Typography, Box, makeStyles, IconButton
} from '@material-ui/core'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import ListAltIcon from '@material-ui/icons/ListAlt'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'

import CustomTooltip from 'theme/wrappers/CustomTooltip'

import { useDispatch, useSelector } from 'react-redux'
import { actions } from 'state/ducks/map'

import useFontsStyles from 'theme/fontsDecorators'

import { getLayersByLayersGroupId } from 'utils/configQueries'

import useStyles from './groupStyle'

const GroupItem = ({
  idGroup, idLayer, title, color, classes, info, link, reference
}) => {
  const dispatch = useDispatch()
  const isVisible = useSelector((state) => state.map.groups[idGroup][idLayer].isVisible)

  const layerChangeHandler = () => {
    dispatch(actions.toggleLayer({ idGroup, idLayer }))
  }
  return (
    <ListItem key={idLayer} className={classes.listItem}>
      <FormControlLabel
        className={classes.formControl}
        control={(
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" style={{ color: '#717170' }} />}
            checkedIcon={<CheckBoxIcon fontSize="small" style={{ color: '#333' }} />}
            checked={isVisible}
            onChange={layerChangeHandler}
            className={classes.checkBox}
            name={idLayer}
          />
        )}
      />
      <Box className={classes.color} style={{ backgroundColor: `${color}` }} />
      <Box className={classes.boxIcons}>
        <Typography
          variant="subtitle2"
        >
          {title}
          {
            isVisible && (
              <IconButton
                className={classes.iconButton}
                target="_blank"
                href={link}
              >
                <CloudDownloadOutlinedIcon
                  className={classes.downloadIcon}
                />
              </IconButton>
            )
          }
          {
            isVisible && info && (
              <CustomTooltip
                className={classes.info}
                title={info}
                placement="top"
              >
                <InfoOutlinedIcon />
              </CustomTooltip>
            )
          }
          {
            isVisible && reference && (
              <CustomTooltip
                className={classes.reference}
                title={
                  reference.map(({ id, subTitle, color: c }) => (
                    <ListItem key={id} className={classes.referenceItems}>
                      <Box className={classes.color} style={{ backgroundColor: `${c}` }} />
                      <Box className={classes.referenceTitle}>
                        <Typography
                          variant="subtitle2"
                        >
                          {subTitle}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))
                }
                placement="top"
              >
                <ListAltIcon />
              </CustomTooltip>
            )
          }
        </Typography>
      </Box>
    </ListItem>
  )
}

const GroupItems = ({ idGroup, classes }) => {
  const layersConfig = getLayersByLayersGroupId(idGroup)
  return (
    layersConfig
      .map(({
        id, title, color, info, link, reference
      }) => (
        <GroupItem
          key={id}
          idGroup={idGroup}
          idLayer={id}
          title={title}
          color={color}
          classes={classes}
          info={info}
          link={link}
          reference={reference}
        />
      ))
  )
}

const Group = ({ id, title }) => {
  const classes = useStyles()
  const decorators = useFontsStyles()

  return (
    <Container className={`${classes.container} ${classes.responsive}`}>
      <Typography variant="subtitle2" className={decorators.bold}>
        {title}
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

GroupItem.propTypes = {
  idGroup: PropTypes.string,
  idLayer: PropTypes.string,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  info: PropTypes.string,
  link: PropTypes.string,
  reference: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  classes: PropTypes.objectOf(makeStyles).isRequired
}
GroupItem.defaultProps = {
  idGroup: '',
  idLayer: '',
  info: '',
  link: '',
  reference: ''
}

export default Group
