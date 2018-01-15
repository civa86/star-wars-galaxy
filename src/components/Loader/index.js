import React from 'react'

import './Loader.css'

import StarWarsIcon from '../StarWarsIcon'
import Error from '../Error'

export const Spinner = props => {
  return <div className="Loader-spin">{props.children}</div>
}

export const SpinnerFlip = props => {
  return <div className="Loader-flip">{props.children}</div>
}

export const ModuleLoader = props => {
  if (props.error) {
    return <Error message="App loading error" />
  } else {
    return (
      <div className="ModuleLoader">
        <SpinnerFlip>
          <StarWarsIcon icon="swg-reball" />
        </SpinnerFlip>
      </div>
    )
  }
}

export const ResourceLoader = props => {
  return (
    <div className="ResourceLoader">
      <SpinnerFlip>
        <StarWarsIcon icon="swg-lightsabers-2" />
      </SpinnerFlip>
    </div>
  )
}
