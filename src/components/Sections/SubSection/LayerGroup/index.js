import React from 'react'

import { Typography } from '@material-ui/core'
import useFontsStyles from 'theme/fontsDecorators'

import { getGroups } from 'utils/configQueries'

import ContainerBar from 'components/Sections/ContainerBar'
import Group from './Group'

const Groups = () => (getGroups().map(({ id, index, title }) => (
  <Group
    key={index}
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
