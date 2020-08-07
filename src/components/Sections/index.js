import React from 'react'
import { Drawer } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Explorer from './SubSection/Explorer'

const Section = () => {
  const isShow = useSelector((state) => state.map.sectionOpen)
  return (

        <Drawer
      variant="persistent"
      open={isShow}
      style={{ position: 'absolute', paddingLeft: 100 }}
        >
    
    <Explorer title="Explorar" />

        </Drawer>
     
  )
}

export default Section
