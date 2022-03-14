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
import Report from 'components/Sections/SubSection/Report'
import Uses from 'components/Sections/SubSection/Uses'
import Works from 'components/Sections/SubSection/Works'
import Normative from 'components/Sections/SubSection/Normative'
import LinksNormatives from 'components/Sections/SubSection/Normative/LinksNormatives'

const Section = () => {
  const isShow = useSelector((state) => state.categories.sectionOpen)
  const sectionId = useSelector((state) => state.categories.sectionId)
  const lastIndex = sectionId.length - 1
  const sectionSelected = sectionId[lastIndex]

  const sectionComponents = new Map([
    ['Report', Report],
    ['Information', Information],
    ['LayerGroup', LayerGroup],
    ['Explorer', Explorer],
    ['Contact', Contact],
    ['Buildable', Buildable],
    ['BasicData', BasicData],
    ['Uses', Uses],
    ['Works', Works],
    ['Affectations', Affectations],
    ['Normative', Normative],
    ['Inspections', Inspections],
    ['UrbanCode', LinksNormatives],
    ['Urban Heritage', LinksNormatives],
    ['Cadastre', LinksNormatives],
    ['Plusvalia', LinksNormatives],
    ['Edification', LinksNormatives],
    ['Manuals and Instructions', LinksNormatives]
  ])

  const Selected = isShow && sectionComponents.get(sectionSelected)
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
