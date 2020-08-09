import React from 'react'
import { Drawer } from '@material-ui/core'
import { useSelector } from 'react-redux'
import config from '../../config'

const Section = () => {
  const isShow = useSelector((state) => state.map.sectionOpen)

  const sectionName = useSelector((state) => state.map.sectionName)
  const SelectedSection = config.categorias.filter((c) => c.title === sectionName)[0].component

  return (
    <Drawer
      variant="persistent"
      open={isShow}
    >
      <SelectedSection />
    </Drawer>
  )
}

export default Section
