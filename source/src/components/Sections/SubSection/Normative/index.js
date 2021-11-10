import React from 'react'

import ContainerBar from 'components/Sections/ContainerBar'
import { getNormative } from 'utils/configQueries'

import InfoCard from './InfoCard'

const Normative = () => (
  <ContainerBar
    type="list"
  >
    {
      getNormative().map(({
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

export default Normative
