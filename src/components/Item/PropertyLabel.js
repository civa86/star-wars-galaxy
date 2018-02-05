import React from 'react'
import PropTypes from 'prop-types'

const ItemPropertyLabel = props => {
  const label = props.label
    .split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
  return <span>{label}</span>
}

ItemPropertyLabel.propTypes = {
  label: PropTypes.string.isRequired
}

export default ItemPropertyLabel
