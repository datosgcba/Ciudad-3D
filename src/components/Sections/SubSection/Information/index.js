import React from 'react'

import ContainerBar from 'components/Sections/ContainerBar'
import { getInformation } from 'utils/configQueries'

import InfoCard from './InfoCard'

const ListCard = () => (getInformation().map(({ id, title, description }) => (
  <InfoCard
    key={id}
    id={id}
    title={title}
    description={description}
  />
)))

const Information = () => (
  <ContainerBar>
    <ListCard />
  </ContainerBar>
)

export default Information
