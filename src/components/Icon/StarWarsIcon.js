import React from 'react'
import PropTypes from 'prop-types'
import './assets/css/starwars-glyphicons.css'

const StarWarsIcon = props => <i aria-hidden="true" className={'swg ' + props.icon} />

StarWarsIcon.propTypes = {
  icon: PropTypes.string.isRequired
}

export default StarWarsIcon
