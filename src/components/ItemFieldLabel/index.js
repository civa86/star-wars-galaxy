import React from 'react'

const ItemFieldLabel = props => {
  const label = props.label
    .split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
  return <span>{label}</span>
}

export default ItemFieldLabel
