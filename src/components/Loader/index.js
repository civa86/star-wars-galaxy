import React from 'react'

import './Loader.css'

import StarWarsIcon from '../StarWarsIcon'
import ErrorMessage from '../ErrorMessage'

export const AnimationSpin = props => {
  return <div className="Loader-spin">{props.children}</div>
}

export const AnimationFlip = props => {
  return <div className="Loader-flip">{props.children}</div>
}

export const AnimationWalk = props => {
  return <div className="Loader-walk">{props.children}</div>
}

export const MainLoader = props => {
  if (props.error) {
    return <ErrorMessage message="App loading error" />
  } else {
    return (
      <div className="ModuleLoader">
        <AnimationFlip>
          <StarWarsIcon icon="swg-yoda-2" />
        </AnimationFlip>
      </div>
    )
  }
}
