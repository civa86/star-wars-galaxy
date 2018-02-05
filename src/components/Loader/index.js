import React from 'react'
import PropTypes from 'prop-types'
import StarWarsIcon from '../Icon/StarWarsIcon'
import ErrorMessage from '../ErrorMessage'

const Loader = props => {
  if (props.error) {
    return <ErrorMessage message="App loading error" />
  } else {
    return (
      <div className="loader">
        <div className="icon">
          <StarWarsIcon icon="swg-reball" />
        </div>
      </div>
    )
  }
}

Loader.propTypes = {
  error: PropTypes.any
}

export default Loader
