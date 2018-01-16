import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navigation.css'

import iconMapping from './IconMapping'
import { ResourceLoader } from '../Loader'
import StarWarsIcon from '../StarWarsIcon'

const NavigationItem = props => (
  <NavLink to={'/' + props.item.name} className="Navigation-list-item">
    <StarWarsIcon icon={iconMapping[props.item.name] || iconMapping.defaultIcon} />{' '}
    {!props.noLabel && <span>{props.item.name}</span>}
  </NavLink>
)

const Navigation = props => {
  const { resources, fetchingItems, homeLink, type, column } = props
  const homeItem = { name: '' }
  return (
    <nav className={'Navigation ' + (type || 'Navigation-Listing')}>
      <ul className="Navigation-list row">
        {homeLink && (
          <li className={column || 'col-xs-12'}>
            <NavigationItem item={homeItem} noLabel />
          </li>
        )}

        {fetchingItems > 0 && <ResourceLoader />}

        {fetchingItems === 0 &&
          resources.map((e, i) => (
            <li key={'nav-item' + i} className={column || 'col-xs-12'}>
              <NavigationItem item={e} />
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default Navigation
