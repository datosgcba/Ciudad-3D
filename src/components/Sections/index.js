import React from 'react'

import { Drawer } from '@material-ui/core'

import { useSelector } from 'react-redux'

import Capa from 'components/Sections/SubSection/Capa'
import Contact from 'components/Sections/SubSection/Contact'
import Edificabilidad from 'components/Sections/SubSection/Edificabilidad'
import Explorar from 'components/Sections/SubSection/Explorer'
import Information from 'components/Sections/SubSection/Information'

import config from 'appConfig'

const Section = () => {
  const isShow = useSelector((state) => state.categories.sectionOpen)
  const sectionName = useSelector((state) => state.categories.sectionName)

  const sectionComponents = new Map([
    ['Capa', Capa],
    ['Contact', Contact],
    ['Explorar', Explorar],
    ['Information', Information],
    ['Edificabilidad', Edificabilidad]
  ])

  const { component: id } = isShow && (config.categorias.find((c) => c.title === sectionName)
    || config.subSection.find((c) => c.title === sectionName))

  const Selected = sectionComponents.get(id)

  return (
    <Drawer
      variant="persistent"
      open={isShow}
    >
      {Selected && <Selected />}
    </Drawer>
  )
}

export default Section
