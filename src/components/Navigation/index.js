import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navigation.css'

import iconMapping from './IconMapping'
import { ResourceLoader } from '../Loader'
import StarWarsIcon from '../StarWarsIcon'

export const NavigationItem = props => (
  <NavLink to={'/' + props.resource.name}>
    <StarWarsIcon icon={iconMapping[props.resource.name] || iconMapping.defaultIcon} />{' '}
    <span>{props.resource.name}</span>
  </NavLink>
)

const Navigation = props => {
  const { resources, isFetching } = props

  return (
    <nav className={'Navigation' + (resources.length > 0 ? ' full' : '')}>
      <NavLink exact to="/">
        <StarWarsIcon icon="swg-starwars" /> <span className="sr-only">home</span>
      </NavLink>

      {isFetching && <ResourceLoader />}

      {!isFetching && resources.map((e, i) => <NavigationItem key={'nav-item' + i} resource={e} />)}
    </nav>
  )
}

export default Navigation
