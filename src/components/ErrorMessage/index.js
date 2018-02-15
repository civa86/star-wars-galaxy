import React from 'react'
import PropTypes from 'prop-types'

import StarWarsIcon from '../Icon/StarWarsIcon'

/**
 * Display an error message with icon.
 */
const ErrorMessage = ({ message = 'Error' }) => {
  return (
    <div className="error text-danger">
      <div className="icon">
        <StarWarsIcon icon="swg-lightsabers" />
      </div>
      <p className="msg">{message}</p>
    </div>
  )
}

ErrorMessage.propTypes = {
  /** a string that contains the message. */
  message: PropTypes.string
}

export default ErrorMessage
