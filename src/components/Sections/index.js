import React from 'react'

import { Drawer } from '@material-ui/core'

import { useSelector } from 'react-redux'

import BasicData from 'components/Sections/SubSection/BasicData'
import Buildable from 'components/Sections/SubSection/Buildable'
import Contact from 'components/Sections/SubSection/Contact'
import Explorer from 'components/Sections/SubSection/Explorer'
import Information from 'components/Sections/SubSection/Information'
import LayerGroup from 'components/Sections/SubSection/LayerGroup'
import Uses from 'components/Sections/SubSection/Uses'
import Works from 'components/Sections/SubSection/Works'

const Section = () => {
  const isShow = useSelector((state) => state.categories.sectionOpen)
  const sectionId = useSelector((state) => state.categories.sectionId[0])

  const sectionComponents = new Map([
    ['Information', Information],
    ['LayerGroup', LayerGroup],
    ['Explorer', Explorer],
    ['Contact', Contact],
    ['Buildable', Buildable],
    ['BasicData', BasicData],
    ['Uses', Uses],
    ['Works', Works]
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
