/* eslint-disable */
import { BrowserRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Routes from './routes'

import Tour from 'reactour'

import { largeScreenSteps } from './steps'

export const ModalContext = React.createContext({ isModalOpen: true })

export default function App(props) {
  const showModal = JSON.parse(localStorage.getItem('isModalOpen')) === false ? false : true
  const [isModalOpen, setIsModalOpen] = useState(showModal)
  const handleClose = () => {
    setIsModalOpen(false)
    localStorage.setItem('isModalOpen', 'false')
  }

  return (
    <div>
     <BrowserRouter>
    <Routes authed={props.isAuthenticated} />
    </BrowserRouter>
      <Tour
        disableInteraction
        steps={largeScreenSteps}
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        className="tour"
      />
    </div>
  )
}


App.propTypes = {
  isAuthenticated: PropTypes.bool
}
App.defaultProps = {
  isAuthenticated: false
}

