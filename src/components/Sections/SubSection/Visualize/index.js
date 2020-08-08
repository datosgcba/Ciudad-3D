import React from 'react'
import Container from '@material-ui/core/Container'
import config from '../../../../config'
import Grupo from '../../../Grupo/Grupo'
import './styles.js'
import Scrollbar from 'react-smooth-scrollbar'

const Visualize = () => {
  const handlePrivacy = () => (config.grupos.map((g, index) => (
    <Grupo
      key={index}
      color={g.color}
      title={g.title}
      help={g.help}
      layers={g.layers} 
    />
  )))

  return (
    <Scrollbar style={{ marginBottom: '5px' }}>
      <Container
        maxWidth="sm"
        className="contenedor"
        style={{
          paddingLeft: '20px',
          paddingRight: '26px',
          marginBottom: '15px',
          marginLeft: 100,
        }}
      >
        {handlePrivacy()}
      </Container>
    </Scrollbar>
  )
}

export default Visualize
