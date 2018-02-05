import React from 'react'
import StarWarsIcon from '../Icon/StarWarsIcon'

const ExternalLinks = () => {
  return (
    <ul className="list-unstyled external-links">
      <li className="swapi">
        powered by{' '}
        <a href="https://swapi.co/" target="_blank" rel="noopener noreferrer">
          SWAPI
        </a>
      </li>
      <li className="github">
        <a href="https://github.com/civa86/star-wars-galaxy" target="_blank" rel="noopener noreferrer">
          <StarWarsIcon icon="swg-github" />
          <span className="sr-only">GitHub</span>
        </a>
      </li>
    </ul>
  )
}

ExternalLinks.propTypes = {}

export default ExternalLinks
