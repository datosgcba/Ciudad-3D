import React from 'react'
import { Box, List } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { getVisibleLayers } from 'utils/configQueries'
import { GroupItem } from 'components/Sections/SubSection/LayerGroup/Group'
import useStyles from './styles'
import useGroupStyle from 'components/Sections/SubSection/LayerGroup/groupStyle'

export const ActiveLayers = () => {
  const classes = useStyles()
  const groupClasses = useGroupStyle()
  const {
    map: { groups },
    categories: { sectionOpen }
  } = useSelector((state) => state)

  const visibleLayers = getVisibleLayers({ groups })

  return (
    <>
      {visibleLayers.length > 0 && (
        <Box
          className={classes.container}
          style={{ left: sectionOpen ? 450 : 100 }}
        >
          <List dense className={classes.list}>
            {visibleLayers.map(
              ({ id, idGroup, title, color, icon, info, link, reference }) => {
                return (
                  <GroupItem
                    key={id}
                    idGroup={idGroup}
                    idLayer={id}
                    title={title}
                    color={color}
                    icon={icon}
                    classes={groupClasses}
                    info={info}
                    link={link}
                    reference={reference}
                  />
                )
              }
            )}
          </List>
        </Box>
      )}
    </>
  )
}

export default ActiveLayers
