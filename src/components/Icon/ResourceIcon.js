import React from 'react'
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
  const icon = props.resource && iconMapping[props.resource] ? iconMapping[props.resource] : iconMapping.defaultIcon
  return <StarWarsIcon icon={icon} />
}

export default ResourceIcon
