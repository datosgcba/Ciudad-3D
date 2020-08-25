import React from 'react'

import { Drawer } from '@material-ui/core'

import { useSelector } from 'react-redux'

import Capa from 'components/Sections/SubSection/Capa'
import Contact from 'components/Sections/SubSection/Contact'
import DatosBasicos from 'components/Sections/SubSection/DatosBasicos'
import Edificabilidad from 'components/Sections/SubSection/Edificabilidad'
import Explorer from 'components/Sections/SubSection/Explorer'
import Information from 'components/Sections/SubSection/Information'
import Obras from 'components/Sections/SubSection/Obras'
import Usos from 'components/Sections/SubSection/Usos'

const Section = () => {
  const isShow = useSelector((state) => state.categories.sectionOpen)
  const sectionId = useSelector((state) => state.categories.sectionId[0])

  const sectionComponents = new Map([
    ['Information', Information],
    ['Capa', Capa],
    ['Explorer', Explorer],
    ['Contact', Contact],
    ['Buildable', Edificabilidad],
    ['BasicData', DatosBasicos],
    ['Use', Usos],
    ['Works', Obras]
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
