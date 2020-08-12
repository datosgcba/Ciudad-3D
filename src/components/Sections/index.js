import React from 'react'

import { Drawer } from '@material-ui/core'

import { useSelector } from 'react-redux'

import config from 'config'

const Section = () => {
  const isShow = useSelector((state) => state.map.sectionOpen)
  const sectionName = useSelector((state) => state.map.sectionName)

  // Ignorar, es para cargar el panel que estoy trabajando
  /*
  if (sectionName === '') {
    isShow = true
    sectionName = 'Información'
  }
  */

  const { component: Selected } = isShow && (config.categorias.find((c) => c.title === sectionName)
  || config.subSection.find((c) => c.title === sectionName))

  return (
    <Drawer
      variant="persistent"
      open={isShow}
    >
      {Selected && <Selected /> }
    </Drawer>
  )
}

export default Section
