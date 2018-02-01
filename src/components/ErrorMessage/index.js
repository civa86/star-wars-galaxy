import React from 'react'

import StarWarsIcon from '../Icon/StarWarsIcon'

const ErrorMessage = props => {
  return (
    <div className="error text-danger">
      <div className="icon">
        <StarWarsIcon icon="swg-lightsabers" />
      </div>
      <p className="msg">{props.message || 'Error'}</p>
    </div>
  )
}

export default ErrorMessage
