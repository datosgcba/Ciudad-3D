import React from 'react'

import ContainerBar from 'components/Sections/ContainerBar'
import { getInformation } from 'utils/configQueries'

import InfoCard from './InfoCard'

const Information = () => (
  <ContainerBar
    type="list"
  >
    {
      getInformation().map(({
        id, title, description, color
      }) => (
        <InfoCard
          key={id}
          id={id}
          title={title}
          description={description}
          color={color}
        />
      ))
    }
  </ContainerBar>
)

export default Information
