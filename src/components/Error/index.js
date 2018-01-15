import React from 'react'

import StarWarsIcon from '../StarWarsIcon'

import './Error.css'

const Error = props => {
  return (
    <div className="Error">
      <div className="icon">
        <StarWarsIcon icon="swg-lightsabers" />
      </div>
      <p>{props.message || ''}</p>
    </div>
  )
}

export default Error
