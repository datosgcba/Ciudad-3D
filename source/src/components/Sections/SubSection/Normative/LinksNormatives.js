import React from 'react'
import { Box, Link } from '@material-ui/core'
import { getNormative } from 'utils/configQueries'
import { useSelector } from 'react-redux'

const LinksNormatives = () => {
  const sectionId = useSelector((state) => state.categories.sectionId)
  const lastIndex = sectionId.length - 1
  const sectionSelected = sectionId[lastIndex]
  const listLink = getNormative().find((element) => element.link)
  console.log(listLink)
  console.log(sectionSelected)

  return (
    <Box>
      {
      getNormative().map(({ link }) => link.map(({ text, url }) => (
        <Link href={url}>
          {text}
        </Link>
      )))
    }
    </Box>
  )
}

export default LinksNormatives
