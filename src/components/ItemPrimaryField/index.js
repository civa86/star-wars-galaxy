import React from 'react'

const ItemPrimaryField = props => {
  const { item, schema } = props
  const key = schema && schema.required && schema.required.length > 0 ? schema.required[0] : null
  return key && item[key] ? <span>{item[key]}</span> : ''
}

export default ItemPrimaryField
