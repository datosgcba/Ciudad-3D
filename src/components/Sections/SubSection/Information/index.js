import React from 'react'

import { Typography } from '@material-ui/core'
import useFontsStyles from 'theme/fontsDecorators'

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

const Information = () => {
  const decorators = useFontsStyles()
  return (
    <ContainerBar>
      <Typography variant="h5" className={`${decorators.bold} ${decorators.marginTop_md} ${decorators.marginBottom_xl}`}>
        Información
      </Typography>
      <ListCard />
    </ContainerBar>
  )
}

export default Information
