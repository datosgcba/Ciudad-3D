import React from 'react'

import { Typography } from '@material-ui/core'
import useFontsStyles from 'theme/fontsDecorators'

import { getLayersGroups } from 'utils/configQueries'

import ContainerBar from 'components/Sections/ContainerBar'
import Group from './Group'

const Groups = () => (getLayersGroups().map(({ id, title }) => (
  <Group
    key={id}
    id={id}
    title={title}
  />
)))

const LayerGroup = () => {
  const decorators = useFontsStyles()

  return (
    <ContainerBar>
      <Typography variant="h5" className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_xl}`}>
        Capas
      </Typography>
      <Groups />
    </ContainerBar>
  )
}

export default LayerGroup
