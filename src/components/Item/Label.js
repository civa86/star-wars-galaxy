import React from 'react'

const ItemLabel = props => {
  const label = props.label
    .split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
  return <span>{label}</span>
}

export default ItemLabel
