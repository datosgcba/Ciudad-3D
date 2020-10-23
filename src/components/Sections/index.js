import React from 'react'

import { Drawer } from '@material-ui/core'

import { useSelector } from 'react-redux'

import Affectations from 'components/Sections/SubSection/Affectations'
import BasicData from 'components/Sections/SubSection/BasicData'
import Buildable from 'components/Sections/SubSection/Buildable'
import Contact from 'components/Sections/SubSection/Contact'
import Explorer from 'components/Sections/SubSection/Explorer'
import Information from 'components/Sections/SubSection/Information'
import Inspections from 'components/Sections/SubSection/Inspections'
import LayerGroup from 'components/Sections/SubSection/LayerGroup'
import Uses from 'components/Sections/SubSection/Uses'
import Works from 'components/Sections/SubSection/Works'

// En este archivo vemos cuál será la sección abierta del panel,
// siempre será el último elemento del array

const Section = () => {
  const isShow = useSelector((state) => state.categories.sectionOpen)
  const sectionId = useSelector((state) => state.categories.sectionId)
  const lastIndex = sectionId.length - 1
  const sectionSelected = sectionId[lastIndex]

  const sectionComponents = new Map([
    ['Information', Information],
    ['LayerGroup', LayerGroup],
    ['Explorer', Explorer],
    ['Contact', Contact],
    ['Buildable', Buildable],
    ['BasicData', BasicData],
    ['Uses', Uses],
    ['Works', Works],
    ['Affectations', Affectations],
    ['Inspections', Inspections]
  ])

  // Acá busco el que voy a usar
  const Selected = isShow && sectionComponents.get(sectionSelected)
  // Acá se renderiza el elemento seleccionado.
  // Tiene dos elementos, uno es un booleano (open),
  // si está en false no se muestra y el otro
  // es el elemento a mostrar
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
