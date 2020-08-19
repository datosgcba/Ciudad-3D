import React from 'react'

import { Typography } from '@material-ui/core'

import ContainerBar from 'components/Sections/ContainerBar'

import { getInformation } from 'utils/configQueries'

import InfoCard from './InfoCard'

import styles from './styles'

const ListCard = () => (getInformation().map(({ title, description }) => (
  <InfoCard
    title={title}
    description={description}
  />
)))

const Information = () => {
  const classes = styles()
  return (
  <ContainerBar>
    <Typography variant="h5" className={classes.title}>
      Información
    </Typography>
    <ListCard />
  </ContainerBar>
  )
}

export default Information
