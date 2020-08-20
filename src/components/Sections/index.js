import React from 'react'

import { Drawer } from '@material-ui/core'

import { useSelector } from 'react-redux'

import Capa from 'components/Sections/SubSection/Capa'
import Contact from 'components/Sections/SubSection/Contact'
import Edificabilidad from 'components/Sections/SubSection/Edificabilidad'
import Explorer from 'components/Sections/SubSection/Explorer'
import Information from 'components/Sections/SubSection/Information'

const Section = () => {
  const isShow = useSelector((state) => state.categories.sectionOpen)
  const sectionId = useSelector((state) => state.categories.sectionId)

  const sectionComponents = new Map([
    ['Information', Information],
    ['Capa', Capa],
    ['Explorer', Explorer],
    ['Contact', Contact],
    ['Buildable', Edificabilidad]
  ])

  const Selected = isShow && sectionComponents.get(sectionId)

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
