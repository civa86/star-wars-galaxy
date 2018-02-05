import React from 'react'
import PropTypes from 'prop-types'

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

ErrorMessage.propTypes = {
  message: PropTypes.string
}

export default ErrorMessage
