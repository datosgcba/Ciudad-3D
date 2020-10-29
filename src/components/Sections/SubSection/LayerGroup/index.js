import React from 'react'

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

const LayerGroup = () => (
  <ContainerBar>
    <Groups />
  </ContainerBar>
)

export default LayerGroup
