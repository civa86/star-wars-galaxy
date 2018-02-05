import React from 'react'
import PropTypes from 'prop-types'
import StarWarsIcon from './StarWarsIcon'

const iconMapping = {
  people: 'swg-leia',
  planets: 'swg-deathstar',
  films: 'swg-lastjedi-2',
  species: 'swg-wookie-2 ',
  vehicles: 'swg-atat',
  starships: 'swg-falcon',
  defaultIcon: 'swg-starwars'
}

const ResourceIcon = props => {
  const { resource } = props
  const icon = iconMapping[resource] ? iconMapping[resource] : iconMapping.defaultIcon
  return <StarWarsIcon icon={icon} />
}

ResourceIcon.propTypes = {
  resource: PropTypes.string.isRequired
}

export default ResourceIcon
