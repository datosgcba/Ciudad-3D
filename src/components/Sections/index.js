import React from 'react'

import { Drawer } from '@material-ui/core'

import { useSelector } from 'react-redux'

import config from 'appConfig'

const Section = () => {
  let isShow = useSelector((state) => state.categories.sectionOpen)
  let sectionName = useSelector((state) => state.categories.sectionName)

  // Ignorar, es para cargar el panel que estoy trabajando

  if (sectionName === '') {
    isShow = true
    sectionName = 'Explorar'
  }

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
