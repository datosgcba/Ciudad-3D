/* eslint-disable react/self-closing-comp */
import React from 'react'

import ContainerBar from 'components/Sections/ContainerBar'

import useStyles from './styles'

const Contact = () => {
  const classes = useStyles()

  return (
    <ContainerBar
      type="list"
      classes={classes}
    >
      <form>
        <p>NOMBRE:</p>
        <input
          className={classes.field}
          type="text"
        />
        <p>EMAIL:</p>
        <input
          className={classes.field}
          type="email"
        />
        <p>COMENTARIOS:</p>
        <textarea
          className={classes.textArea}
        >
        </textarea>
        <br></br>
        <br></br>
        <input
          type="submit"
        />
      </form>
    </ContainerBar>
  )
}

export default Contact
