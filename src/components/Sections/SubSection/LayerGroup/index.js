import React from 'react'

import { getLayersGroups } from 'utils/configQueries'

import ContainerBar from 'components/Sections/ContainerBar'
import Group from './Group'

const LayerGroup = () => (
  <ContainerBar
    type="list"
  >
    {
      getLayersGroups().map(({ id, title }) => (
        <Group
          key={id}
          id={id}
          title={title}
        />
      ))
    }
  </ContainerBar>
)

export default LayerGroup
