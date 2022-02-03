import React from 'react'
import { Box, Link, Typography } from '@material-ui/core'
import { getNormative } from 'utils/configQueries'
import { useSelector } from 'react-redux'
import ContainerBar from 'components/Sections/ContainerBar'
import useStyles from './styles'

const LinksNormatives = () => {
  const sectionId = useSelector((state) => state.categories.sectionId)
  const lastIndex = sectionId.length - 1
  const sectionSelected = sectionId[lastIndex]
  const classes = useStyles()

  return (
    <ContainerBar
      type="list"
    >
      <Box>
        {
          getNormative().find((e) => e.id === sectionSelected).link.map(({ text, url }) => (
            <Box className={classes.Box}>
              {url !== undefined ? (
                <Link className={classes.links} href={url} target={url}>
                  {text}
                </Link>
              ) : (<Typography className={classes.title}>{text}</Typography>)}
            </Box>
          ))
        }
      </Box>
    </ContainerBar>
  )
}

export default LinksNormatives
