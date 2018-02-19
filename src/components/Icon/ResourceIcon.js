import React from 'react'
import PropTypes from 'prop-types'
import StarWarsIcon from './StarWarsIcon'

const iconMapping = {
  light: {
    people: 'swg-leia',
    planets: 'swg-deathstar',
    films: 'swg-swtrilogy',
    species: 'swg-r2d2',
    vehicles: 'swg-sandcrawler',
    starships: 'swg-falcon',
    defaultIcon: 'swg-starwars'
  },
  dark: {
    people: 'swg-darthvader-5',
    planets: 'swg-deathstar',
    films: 'swg-swtrilogy',
    species: 'swg-tfdroid-o',
    vehicles: 'swg-atat',
    starships: 'swg-tie',
    defaultIcon: 'swg-starwars'
  }
}

const ResourceIcon = props => {
  const { resource, forceSide } = props
  const mapping = forceSide && iconMapping[forceSide] ? iconMapping[forceSide] : iconMapping.light
  const icon = mapping[resource] ? mapping[resource] : mapping.defaultIcon
  return <StarWarsIcon icon={icon} />
}

ResourceIcon.propTypes = {
  resource: PropTypes.string,
  forceSide: PropTypes.string
}

export default ResourceIcon
