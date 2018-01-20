import React from 'react'

import StarWarsIcon from '../StarWarsIcon'

import './ErrorMessage.css'

const ErrorMessage = props => {
  return (
    <div className="ErrorMessage">
      <div className="icon">
        <StarWarsIcon icon="swg-lightsabers" />
      </div>
      <p>{props.message || ''}</p>
    </div>
  )
}

export default ErrorMessage
