import React from 'react'

import StarWarsIcon from '../StarWarsIcon'
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

export default Loader
